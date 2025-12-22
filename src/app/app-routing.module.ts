import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterpartyComponent } from './widgets/counterparty/counterparty.component';
import { OnboardingComponent } from './widgets/onboarding/onboarding.component';

const routes: Routes = [
  { path: 'counterparty', component: CounterpartyComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: "**", redirectTo: "counterparty"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
