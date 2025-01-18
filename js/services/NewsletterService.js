import { siteConfig } from '../config/site-config.js';

export class NewsletterService {
  static async subscribe(email) {
    // For now, we'll just simulate an API call
    // In production, you would call your actual API endpoint
    return new Promise((resolve, reject) => {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        reject(new Error('Invalid email address'));
        return;
      }

      // Simulate API call
      setTimeout(() => {
        // Store in localStorage for demo purposes
        try {
          const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
          if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
          }
          resolve({ success: true, message: 'Successfully subscribed to newsletter!' });
        } catch (error) {
          reject(new Error('Error subscribing to newsletter'));
        }
      }, 1000);
    });
  }

  static async unsubscribe(email) {
    // Similar simulation for unsubscribe functionality
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
          const updatedSubscribers = subscribers.filter(e => e !== email);
          localStorage.setItem('newsletter_subscribers', JSON.stringify(updatedSubscribers));
          resolve({ success: true, message: 'Successfully unsubscribed from newsletter!' });
        } catch (error) {
          reject(new Error('Error unsubscribing from newsletter'));
        }
      }, 1000);
    });
  }
}
