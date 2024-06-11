import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login/login.component';
<<<<<<< HEAD
import { LayoutComponent } from './pages/admin/login/layout/layout.component';
import { ProductsComponent } from './pages/wesite/products/products.component';
import { CartComponent } from './pages/wesite/cart/cart.component';
import { AdminPageComponent } from './pages/admin/login/admin-page/admin-page.component';
import { AddProductComponent } from './pages/admin/login/add-product/add-product.component';
import { CategoryComponent } from './pages/admin/login/category/category.component';
import { BrandComponent } from './pages/admin/login/brand/brand.component';


export const routes: Routes = [
=======

export const routes: Routes = [

>>>>>>> 75d8a5f (Initial Commit)
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },{
        path:'login',
        component:LoginComponent
<<<<<<< HEAD
    },
    {
        
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'products',
                component:ProductsComponent
            }
        ]
        
       
    },
    {
        
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'cart',
                component:CartComponent
            }
        ]
        
       
    },
    {
        
        path:'admin',
        component:AdminPageComponent,
        children:[
            {
                path:'addproduct',
                component:AddProductComponent
            }
        ]
    },
    {
        
        path:'admin',
        component:AdminPageComponent,
        children:[
            {
                path:'category',
                component:CategoryComponent
            }
        ]
    },
    {
        
        path:'admin',
        component:AdminPageComponent,
        children:[
            {
                path:'brand',
                component:BrandComponent
            }
        ]
=======
>>>>>>> 75d8a5f (Initial Commit)
    }
];
