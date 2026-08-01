import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app, init_db, db_connection

class TestStoryStoreStandalone(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        self.client = app.test_client()
        with app.app_context():
            init_db()

    def test_01_story_store_homepage(self):
        """Test Story Store homepage route"""
        res = self.client.get('/')
        self.assertEqual(res.status_code, 200)

        res_sub = self.client.get('/story-store')
        self.assertEqual(res_sub.status_code, 200)

    def test_02_story_store_catalog_and_categories(self):
        """Test browsing catalog and categories"""
        res_cat = self.client.get('/story-store/categories')
        self.assertEqual(res_cat.status_code, 200)

        res_books = self.client.get('/story-store/books')
        self.assertEqual(res_books.status_code, 200)

    def test_03_story_store_cart_and_checkout(self):
        """Test cart rendering and checkout page"""
        res_cart = self.client.get('/story-store/cart')
        self.assertEqual(res_cart.status_code, 200)

        # Add item to cart
        self.client.post('/story-store/cart/add', data={'book_id': 'armor-of-light', 'quantity': 1})

        res_chk = self.client.get('/story-store/checkout')
        self.assertEqual(res_chk.status_code, 200)

    def test_04_story_admin_dashboard(self):
        """Test Story Admin login and dashboard"""
        with self.client.session_transaction() as sess:
            sess['story_admin'] = True

        res_admin = self.client.get('/story-store/admin/dashboard')
        self.assertEqual(res_admin.status_code, 200)

if __name__ == '__main__':
    unittest.main()
