import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login/login.component';
import { LayoutComponent } from './pages/admin/login/layout/layout.component';
import { ProductsComponent } from './pages/admin/login/products/products.component';


export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },{
        path:'login',
        component:LoginComponent
    },{
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'products',
                component:ProductsComponent
            }
        ]

    }
];