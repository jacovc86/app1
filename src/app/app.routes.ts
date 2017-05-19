import { PageComponent as HomePage } from './content/home/page/page.component';
import { SubmitComponent as ProductSubmit } from './content/product/submit/submit.component';
import { RouterModule } from '@angular/router';

export const APP_ROUTES = [
    {
        path: '',
        component: HomePage
    },
    {
        path: 'product-submit',
        component: ProductSubmit
    }
];
