import { Routes } from '@angular/router';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { NotfoundComponent } from './shared/component/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { blankGuard } from './core/guards/blank/blank.guard';
import { MypostsComponent } from './pages/myposts/myposts.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'timeline', component: TimelineComponent, title: 'timeline',
        canActivate: [authGuard]
    },
    {
        path: 'myPosts', component: MypostsComponent, title: 'myPosts',
        canActivate: [authGuard]
    },
    {
        path: 'resetPassword', component: ResetpasswordComponent, title: 'resetPassword',
        canActivate: [authGuard]
    },
    {
        path: 'login', component: LoginComponent, title: 'login',
        canActivate: [blankGuard]
    },
    {
        path: 'register', component: RegisterComponent, title: 'register',
        canActivate: [blankGuard]
    },
    { path: '**', component: NotfoundComponent, title: 'notfound' },
];
