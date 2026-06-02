from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from barbershop.domain.models import Barber, Client

class APIAuthTest(TestCase):

    def setUp(self):
        self.client = APIClient()

        self.admin_user = User.objects.create_superuser('admin', 'admin@barbershop.com', 'admin_pass')

        self.barber1_user = User.objects.create_user('barber1', 'b1@b.com', 'pass')
        self.barber1 = Barber.objects.create(
            user=self.barber1_user,
            first_name='B1', last_name='L1', phone='1234567'
        )

        self.barber2_user = User.objects.create_user('barber2', 'b2@b.com', 'pass')
        self.barber2 = Barber.objects.create(
            user=self.barber2_user,
            first_name='B2', last_name='L2', phone='7654321'
        )

        self.client_unauth = APIClient()

        self.client_admin = APIClient()
        self.client_admin.force_authenticate(user=self.admin_user)

        self.client_b1 = APIClient()
        self.client_b1.force_authenticate(user=self.barber1_user)

    def test_auth_me_unauthenticated(self):
        url = reverse('auth-me')
        response = self.client_unauth.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_auth_me_admin(self):
        url = reverse('auth-me')
        response = self.client_admin.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['is_staff'])

    def test_auth_me_barber(self):
        url = reverse('auth-me')
        response = self.client_b1.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(response.data['is_staff'])
        self.assertEqual(response.data['barber_id'], self.barber1.id)

    def test_create_barber_admin_only(self):
        url = reverse('barber-list')
        data = {
            'first_name': 'New',
            'last_name': 'Barber',
            'phone': '1111111',
            'email': 'new@b.com',
            'password': 'secret123'
        }
        
        # Unauth should fail
        resp1 = self.client_unauth.post(url, data)
        self.assertEqual(resp1.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # Barber should fail (needs admin)
        resp2 = self.client_b1.post(url, data)
        self.assertEqual(resp2.status_code, status.HTTP_403_FORBIDDEN)
        
        # Admin should succeed
        resp3 = self.client_admin.post(url, data)
        self.assertEqual(resp3.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email='new@b.com').exists())

    def test_login_by_phone_resolves_client_even_if_username_differs(self):
        user = User.objects.create_user('legacy_name_1', 'c@c.com', 'secret')
        Client.objects.create(
            user=user, first_name='Cli', last_name='Ente', phone='3009998888'
        )
        url = reverse('token_obtain_pair')
        resp = self.client_unauth.post(
            url, {'username': '3009998888', 'password': 'secret'}, format='json'
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIn('access', resp.data)

    def test_login_by_phone_resolves_barber(self):
        url = reverse('token_obtain_pair')
        resp = self.client_unauth.post(
            url, {'username': self.barber1.phone, 'password': 'pass'}, format='json'
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertIn('access', resp.data)

    def test_login_admin_by_username_still_works(self):
        url = reverse('token_obtain_pair')
        resp = self.client_unauth.post(
            url, {'username': 'admin', 'password': 'admin_pass'}, format='json'
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_login_wrong_password_fails(self):
        url = reverse('token_obtain_pair')
        resp = self.client_unauth.post(
            url, {'username': self.barber1.phone, 'password': 'wrong'}, format='json'
        )
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_agenda_access_control(self):
        url_b1 = reverse('barber-agenda', args=[self.barber1.id])
        url_b2 = reverse('barber-agenda', args=[self.barber2.id])

        # Admin can view both
        self.assertEqual(self.client_admin.get(url_b1).status_code, status.HTTP_200_OK)
        self.assertEqual(self.client_admin.get(url_b2).status_code, status.HTTP_200_OK)

        # Barber 1 can only view Barber 1's agenda
        self.assertEqual(self.client_b1.get(url_b1).status_code, status.HTTP_200_OK)
        self.assertEqual(self.client_b1.get(url_b2).status_code, status.HTTP_403_FORBIDDEN)
