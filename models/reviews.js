
let reviews = [
    {
      id: '1',
      productId: '1',
      userId: '1',
      rating: 5,
      comment: "Best smartphone I've ever owned! The camera is incredible and battery life is great.",
      createdAt: '2023-03-12T10:30:00Z'
    },
    {
      id: '2',
      productId: '1',
      userId: '2',
      rating: 4,
      comment: 'Great phone overall, but a bit pricey. The features are worth it though.',
      createdAt: '2023-03-15T14:22:00Z'
    },
    {
        id: '3',
        productId: '2',
        userId: '1',
        rating: 5,
        comment: 'These earbuds have amazing sound quality and the noise cancellation works perfectly.',
        createdAt: '2023-03-18T09:15:00Z'
      },
      {
        id: '4',
        productId: '3',
        userId: '2',
        rating: 3,
        comment: 'Decent coffee maker but the programming is a bit complicated.',
        createdAt: '2023-03-22T11:45:00Z'
      }
    ];
    const getAllReviews = (filters = {}) => {
      let filteredReviews = [...reviews];
      
      // Apply filters
      if (filters.productId) {
        filteredReviews = filteredReviews.filter(review => review.productId === filters.productId);
      }
      
      if (filters.userId) {
        filteredReviews = filteredReviews.filter(review => review.userId === filters.userId);
      }
      
      if (filters.minRating) {
        filteredReviews = filteredReviews.filter(review => review.rating >= parseInt(filters.minRating));
      }
      
      if (filters.maxRating) {
        filteredReviews = filteredReviews.filter(review => review.rating <= parseInt(filters.maxRating));
      }
      
      return filteredReviews;
    };

    const getReviewById = (id) => {
      return reviews.find(review => review.id === id);
    };
    
    const createReview = (reviewData) => {
      const newReview = {
        id: uuidv4(),
        ...reviewData,
        rating: parseInt(reviewData.rating),
        createdAt: new Date().toISOString()
      };
      
      reviews.push(newReview);
      return newReview;
    };
    const updateReview = (id, reviewData) => {
      const index = reviews.findIndex(review => review.id === id);
      
      if (index === -1) return null;
      
      const updatedReview = {
        ...reviews[index],
        ...reviewData,
        id: reviews[index].id, // Ensure ID doesn't change
        updatedAt: new Date().toISOString()
      };
      
      // Convert numeric fields
      if (reviewData.rating !== undefined) {
        updatedReview.rating = parseInt(reviewData.rating);
      }
      
      reviews[index] = updatedReview;
      return updatedReview;
    };
    