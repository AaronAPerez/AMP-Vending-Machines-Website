// components/reviews/ReviewGenerationSystem.tsx - Fixed TypeScript errors

import React, { useState } from 'react';

interface ReviewGenerationSystemProps {
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
}

interface CustomerData {
  satisfactionLevel?: number;
  [key: string]: any;
}

export default function ReviewGenerationSystem({ 
  onRatingChange, 
  readonly = false 
}: ReviewGenerationSystemProps) {
  const [customerData, setCustomerData] = useState<CustomerData>({});

  const handleRatingChange = (rating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(rating);
    }
  };

  const handleCustomerRatingChange = (rating: number) => {
    setCustomerData({
      ...customerData, 
      satisfactionLevel: rating
    });
  };

  const StarRating = ({ 
    rating, 
    onRatingChange: onStarRatingChange, 
    readonly: starReadonly = false 
  }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`w-8 h-8 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${!starReadonly ? 'hover:text-yellow-400 cursor-pointer' : 'cursor-default'}`}
            onClick={() => !starReadonly && onStarRatingChange && onStarRatingChange(star)}
            disabled={starReadonly}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="review-generation-system p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Review Generation System</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Satisfaction Rating</h3>
          <StarRating
            rating={customerData.satisfactionLevel || 0}
            onRatingChange={handleCustomerRatingChange}
            readonly={readonly}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Overall Rating</h3>
          <StarRating
            rating={0}
            onRatingChange={handleRatingChange}
            readonly={readonly}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            This system helps generate and manage customer reviews for AMP Vending services.
          </p>
        </div>
      </div>
    </div>
  );
}
