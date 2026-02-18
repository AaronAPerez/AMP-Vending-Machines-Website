'use client';

import { useEffect, useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon, ImageIcon, FilterIcon } from 'lucide-react';
import DataTable, { Column } from '@/components/admin/shared/DataTable';
import LoadingSpinner from '@/components/admin/shared/LoadingSpinner';
import ConfirmDialog from '@/components/admin/shared/ConfirmDialog';
import FormField from '@/components/admin/shared/FormField';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  category: string;
  image_path: string;
  is_popular: boolean;
  is_active: boolean;
  display_order: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editDialog, setEditDialog] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null
  });
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null
  });

  const categories = ['Snacks', 'Beverages', 'Candy', 'Healthy Options'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products', { credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  };

  const handleTogglePopular = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ is_popular: !product.is_popular })
      });

      if (!response.ok) throw new Error('Failed to update product');

      setProducts(products.map(p =>
        p.id === product.id ? { ...p, is_popular: !p.is_popular } : p
      ));
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ is_active: !product.is_active })
      });

      if (!response.ok) throw new Error('Failed to update product');

      setProducts(products.map(p =>
        p.id === product.id ? { ...p, is_active: !p.is_active } : p
      ));
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.product) return;

    try {
      const response = await fetch(`/api/admin/products/${deleteDialog.product.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to delete product');

      setProducts(products.filter(p => p.id !== deleteDialog.product?.id));
      setDeleteDialog({ isOpen: false, product: null });
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const columns: Column<Product>[] = [
    {
      key: 'image',
      label: 'Image',
      render: (product) => (
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#222222] flex items-center justify-center">
          {product.image_path ? (
            <Image src={product.image_path} alt={product.name}
            width={50}
            height={50}
            className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-[#A5ACAF]" />
          )}
        </div>
      )
    },
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,
      render: (product) => (
        <div>
          <p className="font-medium text-[#F5F5F5]">{product.name}</p>
          <p className="text-xs text-[#A5ACAF]">{product.category}</p>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (product) => (
        <span className="px-2 py-1 text-xs rounded-full bg-[#FD5A1E]/20 text-[#FD5A1E]">
          {product.category}
        </span>
      )
    },
    {
      key: 'is_popular',
      label: 'Popular',
      sortable: true,
      render: (product) => (
        <button
          onClick={() => handleTogglePopular(product)}
          className={`px-2 py-1 text-xs rounded-full transition-colors ${
            product.is_popular
              ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
              : 'bg-[#222222] text-[#A5ACAF] hover:bg-[#333333]'
          }`}
        >
          {product.is_popular ? '★ Popular' : '☆ Mark Popular'}
        </button>
      )
    },
    {
      key: 'is_active',
      label: 'Status',
      sortable: true,
      render: (product) => (
        <button
          onClick={() => handleToggleActive(product)}
          className={`px-2 py-1 text-xs rounded-full transition-colors ${
            product.is_active
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
          }`}
        >
          {product.is_active ? 'Active' : 'Inactive'}
        </button>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (product) => (
        <button
          onClick={() => setDeleteDialog({ isOpen: true, product })}
          className="p-2 hover:bg-[#222222] rounded-lg transition-colors"
          title="Delete"
        >
          <TrashIcon className="w-4 h-4 text-red-500" />
        </button>
      )
    }
  ];

  if (loading) {
    return <LoadingSpinner text="Loading products..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F5]">Products</h1>
          <p className="text-[#A5ACAF] mt-2">
            Manage your product catalog ({products.length} products)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 bg-[#111111] border border-[#333333] rounded-lg p-4">
        <FilterIcon className="w-5 h-5 text-[#A5ACAF]" />
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#FD5A1E] text-white'
                : 'bg-[#222222] text-[#A5ACAF] hover:bg-[#333333]'
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-[#FD5A1E] text-white'
                  : 'bg-[#222222] text-[#A5ACAF] hover:bg-[#333333]'
              }`}
            >
              {category} ({products.filter(p => p.category === category).length})
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111111] border border-[#333333] rounded-lg p-4">
          <p className="text-sm text-[#A5ACAF]">Total Products</p>
          <p className="text-2xl font-bold text-[#F5F5F5] mt-1">{products.length}</p>
        </div>
        <div className="bg-[#111111] border border-[#333333] rounded-lg p-4">
          <p className="text-sm text-[#A5ACAF]">Popular Items</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">
            {products.filter(p => p.is_popular).length}
          </p>
        </div>
        <div className="bg-[#111111] border border-[#333333] rounded-lg p-4">
          <p className="text-sm text-[#A5ACAF]">Active Products</p>
          <p className="text-2xl font-bold text-green-400 mt-1">
            {products.filter(p => p.is_active).length}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <DataTable
        columns={columns}
        data={filteredProducts}
        keyExtractor={(product) => product.id}
        searchable
        searchPlaceholder="Search products..."
        emptyMessage="No products found."
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, product: null })}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteDialog.product?.name}"?`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
