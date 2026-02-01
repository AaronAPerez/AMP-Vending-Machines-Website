import { supabaseServer } from '../supabase';
import sharp from 'sharp';

/**
 * Image upload result
 */
export interface ImageUploadResult {
  id: string;
  storagePath: string;
  publicUrl: string;
  width: number;
  height: number;
  fileSize: number;
}

/**
 * Image Upload Service
 * Handles uploading, optimizing, and managing images in Supabase Storage
 */
export class ImageUploadService {
  /**
   * Upload machine image to Supabase Storage
   */
  static async uploadMachineImage(
    file: File,
    machineId: string,
    machineSlug: string,
    altText: string,
    displayOrder: number = 0,
    isPrimary: boolean = false
  ): Promise<ImageUploadResult> {
    try {
      if (!supabaseServer) {
        throw new Error('Supabase not configured');
      }

      // Validate file
      this.validateImage(file, 10 * 1024 * 1024); // 10MB max

      // Optimize image
      const buffer = await file.arrayBuffer();
      const optimizedBuffer = await this.optimizeImage(Buffer.from(buffer));

      // Generate storage path
      const timestamp = Date.now();
      const extension = 'webp'; // Always convert to WebP
      const fileName = `${timestamp}_${this.sanitizeFileName(file.name)}.${extension}`;
      const storagePath = `${machineSlug}/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabaseServer.storage
        .from('machine-images')
        .upload(storagePath, optimizedBuffer, {
          contentType: 'image/webp',
          cacheControl: '31536000', // 1 year
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }

      // Get public URL
      const { data: urlData } = supabaseServer.storage
        .from('machine-images')
        .getPublicUrl(storagePath);

      // Get image metadata
      const metadata = await sharp(optimizedBuffer).metadata();

      // Create database record
      const { data: imageRecord, error: dbError } = await supabaseServer
        .from('machine_images')
        .insert({
          machine_id: machineId,
          storage_path: storagePath,
          public_url: urlData.publicUrl,
          alt_text: altText,
          display_order: displayOrder,
          file_name: fileName,
          file_size: optimizedBuffer.length,
          mime_type: 'image/webp',
          width: metadata.width,
          height: metadata.height,
          is_primary: isPrimary
        })
        .select()
        .single();

      if (dbError) {
        // Cleanup: delete from storage if DB insert fails
        await supabaseServer.storage
          .from('machine-images')
          .remove([storagePath]);
        throw new Error(`Failed to save image metadata: ${dbError.message}`);
      }

      return {
        id: imageRecord.id,
        storagePath: imageRecord.storage_path,
        publicUrl: imageRecord.public_url,
        width: metadata.width!,
        height: metadata.height!,
        fileSize: optimizedBuffer.length
      };
    } catch (error) {
      console.error('Error uploading machine image:', error);
      throw error;
    }
  }

  /**
   * Upload product image to Supabase Storage
   */
  static async uploadProductImage(
    file: File,
    productSlug: string,
    category: string
  ): Promise<{ storagePath: string; publicUrl: string }> {
    try {
      if (!supabaseServer) {
        throw new Error('Supabase not configured');
      }

      // Validate file
      this.validateImage(file, 2 * 1024 * 1024); // 2MB max

      // Optimize image
      const buffer = await file.arrayBuffer();
      const optimizedBuffer = await this.optimizeImage(Buffer.from(buffer), 800); // Smaller size for products

      // Generate storage path
      const extension = 'webp';
      const fileName = `${productSlug}.${extension}`;
      const storagePath = `${category}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabaseServer.storage
        .from('product-images')
        .upload(storagePath, optimizedBuffer, {
          contentType: 'image/webp',
          cacheControl: '31536000',
          upsert: true // Allow overwriting for products
        });

      if (uploadError) {
        throw new Error(`Failed to upload product image: ${uploadError.message}`);
      }

      // Get public URL
      const { data: urlData } = supabaseServer.storage
        .from('product-images')
        .getPublicUrl(storagePath);

      return {
        storagePath,
        publicUrl: urlData.publicUrl
      };
    } catch (error) {
      console.error('Error uploading product image:', error);
      throw error;
    }
  }

  /**
   * Delete machine image
   */
  static async deleteMachineImage(imageId: string): Promise<void> {
    try {
      if (!supabaseServer) {
        throw new Error('Supabase not configured');
      }

      // Get image record
      const { data: image, error: fetchError } = await supabaseServer
        .from('machine_images')
        .select('storage_path')
        .eq('id', imageId)
        .single();

      if (fetchError || !image) {
        throw new Error('Image not found');
      }

      // Delete from storage
      const { error: storageError } = await supabaseServer.storage
        .from('machine-images')
        .remove([image.storage_path]);

      if (storageError) {
        console.warn('Failed to delete from storage:', storageError);
        // Continue with DB deletion even if storage deletion fails
      }

      // Delete from database
      const { error: dbError } = await supabaseServer
        .from('machine_images')
        .delete()
        .eq('id', imageId);

      if (dbError) {
        throw new Error(`Failed to delete image record: ${dbError.message}`);
      }
    } catch (error) {
      console.error('Error deleting machine image:', error);
      throw error;
    }
  }

  /**
   * Reorder machine images
   */
  static async reorderMachineImages(
    machineId: string,
    imageOrder: string[]
  ): Promise<void> {
    try {
      if (!supabaseServer) {
        throw new Error('Supabase not configured');
      }

      // Store in local variable to satisfy TypeScript null check
      const supabase = supabaseServer;

      // Update display_order for each image
      const updates = imageOrder.map((imageId, index) =>
        supabase
          .from('machine_images')
          .update({ display_order: index })
          .eq('id', imageId)
          .eq('machine_id', machineId)
      );

      await Promise.all(updates);
    } catch (error) {
      console.error('Error reordering images:', error);
      throw error;
    }
  }

  /**
   * Update image alt text
   */
  static async updateImageAltText(imageId: string, altText: string): Promise<void> {
    try {
      if (!supabaseServer) {
        throw new Error('Supabase not configured');
      }

      const { error } = await supabaseServer
        .from('machine_images')
        .update({ alt_text: altText })
        .eq('id', imageId);

      if (error) {
        throw new Error(`Failed to update alt text: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating alt text:', error);
      throw error;
    }
  }

  /**
   * Set primary image for machine
   */
  static async setPrimaryImage(machineId: string, imageId: string): Promise<void> {
    try {
      if (!supabaseServer) {
        throw new Error('Supabase not configured');
      }

      // Unset all primary flags for this machine
      await supabaseServer
        .from('machine_images')
        .update({ is_primary: false })
        .eq('machine_id', machineId);

      // Set the specified image as primary
      const { error } = await supabaseServer
        .from('machine_images')
        .update({ is_primary: true })
        .eq('id', imageId);

      if (error) {
        throw new Error(`Failed to set primary image: ${error.message}`);
      }
    } catch (error) {
      console.error('Error setting primary image:', error);
      throw error;
    }
  }

  /**
   * Validate image file
   */
  private static validateImage(file: File, maxSize: number): void {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
    }

    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
      throw new Error(`File size exceeds ${maxSizeMB}MB limit.`);
    }
  }

  /**
   * Optimize image using Sharp
   */
  private static async optimizeImage(
    buffer: Buffer,
    maxWidth: number = 2000
  ): Promise<Buffer> {
    try {
      return await sharp(buffer)
        .resize(maxWidth, maxWidth, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({
          quality: 85,
          effort: 4 // Compression effort (0-6, higher = smaller file but slower)
        })
        .toBuffer();
    } catch (error) {
      console.error('Error optimizing image:', error);
      throw new Error('Failed to optimize image');
    }
  }

  /**
   * Sanitize filename for safe storage
   */
  private static sanitizeFileName(fileName: string): string {
    // Remove extension
    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');

    // Replace special characters with hyphens
    return nameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50); // Limit length
  }

  /**
   * Get image metadata
   */
  static async getImageMetadata(buffer: Buffer): Promise<{
    width: number;
    height: number;
    format: string;
    size: number;
  }> {
    try {
      const metadata = await sharp(buffer).metadata();
      return {
        width: metadata.width || 0,
        height: metadata.height || 0,
        format: metadata.format || 'unknown',
        size: buffer.length
      };
    } catch (error) {
      console.error('Error getting image metadata:', error);
      throw new Error('Failed to get image metadata');
    }
  }
}
