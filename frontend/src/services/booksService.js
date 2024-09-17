import sendRequest from './sendRequest';

const BASE_URL = '/api/books';

export function index() {
    return sendRequest(BASE_URL);
  };

export function show(bookId) {
  return sendRequest(`${BASE_URL}/${bookId}`)
};

export async function create(bookFormData){
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export async function createReview(bookId, reviewFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export async function deleteBook(bookId) {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export async function deleteReview(bookId, reviewId) {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


export async function update(bookId, bookFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}; 

export async function updateReview(bookId, reviewId, reviewFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${bookId}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};