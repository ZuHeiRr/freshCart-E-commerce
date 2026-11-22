import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'freshCart - Home',
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then((m) => m.BrandsComponent),
    title: 'freshCart - Brands',
  },
  {
    path: 'cart',canActivate:[authGuard],
    loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
    title: 'freshCart - Cart',
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then((m) => m.CategoriesComponent),
    title: 'freshCart - Categories',
  },
  {
    path: 'categories/:id',
    loadComponent: () =>
      import('./features/categories/components/single-category/single-category.component').then(
        (m) => m.SingleCategoryComponent,
      ),
    title: 'freshCart - Categories',
  },
  {
    path: 'change-pass',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/change-pass/change-pass.component').then((m) => m.ChangePassComponent),
    title: 'freshCart - Change Password',
  },
  {
    path: 'checkout',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
    title: 'freshCart - Checkout',
  },
  {
    path: 'forget-pass',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/forget-pass/forget-pass.component').then((m) => m.ForgetPassComponent),
    title: 'freshCart - Forget Password',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
    title: 'freshCart - Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then((m) => m.RegisterComponent),
    title: 'freshCart - Register',
  },
  {
    path: 'allOrders',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/all-orders/all-orders.component').then((m) => m.AllOrdersComponent),
    title: 'freshCart - AllOrders',
  },
  {
  path: 'product-details/:id',
  loadComponent: () =>
    import('./features/product-details/product-details.component').then(
      (m) => m.ProductDetailsComponent,
    ),
  title: 'freshCart - Product Details',
  children: [
     {
    path: '',
    redirectTo: 'product-details-tab',
    pathMatch: 'full',
  },
    {
      path: 'product-details-tab',
      loadComponent: () =>
        import('./features/product-details/components/product-details-tap/product-details-tap.component').then(
          (m) => m.ProductDetailsTapComponent,
        ),
      
    },
    {
      path: 'reviews',
      loadComponent: () =>
        import('./features/product-details/components/reviews-tap/reviews-tap.component').then(
          (m) => m.ReviewsTapComponent,
        ),
     
    },
    {
      path: 'shipping-return',
      loadComponent: () =>
        import('./features/product-details/components/shipping-returns-tap/shipping-returns-tap.component').then(
          (m) => m.ShippingReturnsTapComponent,
        ),
    },
  ],
},
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then((m) => m.ShopComponent),
    title: 'freshCart - Shop',
  },
  {
    path: 'wishlist',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then((m) => m.WishlistComponent),
    title: 'freshCart - Wishlist',
  },
  {
    path: 'address',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/address/address.component').then((m) => m.AddressesComponent),
    title: 'freshCart - Address',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'freshCart - Not Found',
  },
];
