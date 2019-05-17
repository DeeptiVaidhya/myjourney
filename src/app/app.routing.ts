import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { AchievementsandeventsComponent } from "./components/achievementsandevents/achievementsandevents.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ChaptersComponent } from "./components/chapters/chapters.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
// import { DecisionMakingComponent } from './decision-making/decision-making.component';
import { FaqComponent } from "./components/faq/faq.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { HomeComponent } from "./components/home/home.component";
import { MyfavoritesComponent } from "./components/myfavorites/myfavorites.component";
import { MyReflectionsComponent } from "./components/my-reflections/my-reflections.component";
// import { MedicalDecisionsComponent } from './medical-decisions/medical-decisions.component';
// import { NonPhysicalSideEffectsComponent } from './non-physical-side-effects/non-physical-side-effects.component';
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
// import { QualityOfLifeComponent } from './quality-of-life/quality-of-life.component';
import { ReportComponent } from "./components/report/report.component";
import { ResoursesComponent } from "./components/resourses/resourses.component";
import { TermsConditionsComponent } from "./components/terms-conditions/terms-conditions.component";
// import { GenomicTestingResultsComponent } from './genomic-testing-results/genomic-testing-results.component';
import { PatientGuard } from "./guards/patient.guard";


const MAINMENU_ROUTES: Routes = [
	{ path: "", redirectTo: "home", pathMatch: "full" },
	{ path: "home", component: HomeComponent },

	{
		path: "patient/dashboard",
		component: DashboardComponent,
		canActivate: [PatientGuard],
	},
	// {
	// 	path: "patient/dashboard/understanding-breast-cancer",
	// 	component: UnderstandingBreastCancerComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/breast-cancer/what-is-breast-cancer",
	// 	component: WhatIsBreastCancerComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/breast-cancer/who-gets-breast-cancer",
	// 	component: WhoGetsBreastCancerComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/breast-cancer/what-does-not-cause-breast-cancer",
	// 	component: WhatDoesnotCauseBreastCancerComponent,
	// 	canActivate: [PatientGuard]
	// },
	{
		path: "achievements",
		component: AchievementsandeventsComponent,
		canActivate: [PatientGuard]
	},
	{
		path: "patient/my-favorite",
		component: MyfavoritesComponent,
		canActivate: [PatientGuard]
	},
	{
		path: "my-reflections",
		component: MyReflectionsComponent,
		canActivate: [PatientGuard]
	},
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/breast-cancer/breast-cancer-treatment",
	// 	component: BreastCancerTreatmentComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/breast-cancer/who-treats-breast-cancer",
	// 	component: WhoTreatsBreastCancerComponent,
	// 	canActivate: [PatientGuard]
	// },

	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/wellness/second-cancer",
	// 	component: SecondCancerComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/wellness/breast-cancer-screening",
	// 	component: BreastCancerScreeningComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/wellness/cervical-cancer-screening",
	// 	component: CervicalCancerScreeningComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/wellness/colorectal-cancer-screening",
	// 	component: ColorectalCancerScreeningComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/wellness/lung-cancer-screening",
	// 	component: LungCancerScreeningComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/wellness/skin-cancer-screening",
	// 	component: SkinCancerScreeningComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/wellness/prevent-second-cancer",
	// 	component: PreventSecondCancerComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path:
	// 		"patient/dashboard/understanding-breast-cancer/wellness/sun-protection",
	// 	component: SunProtectionComponent,
	// 	canActivate: [PatientGuard]
	// },

	// {
	// 	path: "patient/dashboard/eat-well-feel-well",
	// 	component: EatWellFeelWellComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path: "patient/dashboard/healthy-mind",
	// 	component: HealthyMindComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path: "patient/dashboard/healthy-at-any-age",
	// 	component: HealthyAtAnyAgeComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path: "patient/dashboard/staying-active",
	// 	component: StayingActiveComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path: "patient/dashboard/care-after-cancer",
	// 	component: CareAfterCancerComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path: "patient/dashboard/life-after-cancer",
	// 	component: LifeAfterCancerComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path: "patient/dashboard/wrapping-up",
	// 	component: WrappingUpComponent,
	// 	canActivate: [PatientGuard]
	// },

	// Questionnaire
	// {
	// 	path: "patient/dashboard/pro-ctcae",
	// 	component: ProCtcaeComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path: "patient/dashboard/promis",
	// 	component: PromisComponent,
	// 	canActivate: [PatientGuard]
	// },

	// {
	// 	path: "patient/dashboard/decision-making",
	// 	component: DecisionMakingComponent,
	// 	canActivate: [PatientGuard]
	// },
	// {
	// 	path: "patient/dashboard/ies",
	// 	component: IesComponent,
	// 	canActivate: [PatientGuard]
	// },
	{
		path: "patient/dashboard/report",
		component: ReportComponent,
		canActivate: [PatientGuard]
	},
	{
		path: "questionnaire/:type",
		component: QuestionnaireComponent,
		canActivate: [PatientGuard]
	},
	{
		path: "patient/profile",
		component: ProfileComponent,
		canActivate: [PatientGuard]
	},
	// Dynamic Route Starts
	{
		path: "patient/dashboard/:chapter",
		component: ChaptersComponent,
		canActivate: [PatientGuard]
	},
	{
		path: "patient/dashboard/:chapter/:sub_topic",
		component: ChaptersComponent,
		canActivate: [PatientGuard]
	},


	// Researcher Routes

	// Common Routes
	{ path: "create-password/:code", component: ChangePasswordComponent },
	{ path: "reset-password/:code", component: ChangePasswordComponent },
	{ path: "reset-password", component: ChangePasswordComponent },
	{ path: "forgot-password", component: ForgotPasswordComponent },
	{ path: "resources", component: ResoursesComponent },
	{ path: "about-us", component: AboutUsComponent },
	{ path: "contact-us", component: ContactUsComponent },
	{ path: "faq", component: FaqComponent },
	{ path: "terms-conditions", component: TermsConditionsComponent },
	{ path: "**", component: PageNotFoundComponent }
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES, {
	useHash: true
});
