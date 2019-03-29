import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { AchievementsandeventsComponent } from "./components/achievementsandevents/achievementsandevents.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ChaptersComponent } from "./components/chapters/chapters.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DecisionMakingComponent } from "./components/decision-making/decision-making.component";
// import { DecisionMakingComponent } from './decision-making/decision-making.component';
import { FactG7Component } from "./components/fact-g7/fact-g7.component";
import { FaqComponent } from "./components/faq/faq.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { HomeComponent } from "./components/home/home.component";
import { IesComponent } from "./components/ies/ies.component";
import { MyfavoritesComponent } from "./components/myfavorites/myfavorites.component";
// import { MedicalDecisionsComponent } from './medical-decisions/medical-decisions.component';
// import { NonPhysicalSideEffectsComponent } from './non-physical-side-effects/non-physical-side-effects.component';
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
// import { PhysicalSideEffectsComponent } from './physical-side-effects/physical-side-effects.component';
// import { PrecisionOncologyComponent } from './precision-oncology/precision-oncology.component';
import { ProCtcaeComponent } from "./components/pro-ctcae/pro-ctcae.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { PromisComponent } from "./components/promis/promis.component";
// import { QualityOfLifeComponent } from './quality-of-life/quality-of-life.component';
import { ReportComponent } from "./components/report/report.component";
import { AddPatientComponent } from "./components/researcher/add-patient/add-patient.component";
import { AddProviderComponent } from "./components/researcher/add-provider/add-provider.component";
import { EditPatientComponent } from "./components/researcher/edit-patient/edit-patient.component";
import { ListPatientsComponent } from "./components/researcher/list-patients/list-patients.component";
import { ListProvidersComponent } from "./components/researcher/list-providers/list-providers.component";
import { PatientDetailsComponent } from "./components/researcher/patient-details/patient-details.component";
import { ResearcherDashboardComponent } from "./components/researcher/researcher-dashboard/researcher-dashboard.component";
import { ResearcherProfileComponent } from "./components/researcher/researcher-profile/researcher-profile.component";
import { ResoursesComponent } from "./components/resourses/resourses.component";
import { TermsConditionsComponent } from "./components/terms-conditions/terms-conditions.component";
// import { GenomicTestingResultsComponent } from './genomic-testing-results/genomic-testing-results.component';
import { PatientGuard } from "./guards/patient.guard";
import { ProviderGuard } from "./guards/provider.guard";
// Import guard
import { ResearcherGuard } from "./guards/researcher.guard";

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
		path:
			"achivmenets",
		component: AchievementsandeventsComponent,
		canActivate: [PatientGuard]
	},
	{
		path:
			"favorite",
		component: MyfavoritesComponent,
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

	// { path: 'patient/dashboard/precision-oncology', component: PrecisionOncologyComponent, canActivate: [PatientGuard] },
	// { path: 'patient/dashboard/genomic-testing-results', component: GenomicTestingResultsComponent, canActivate: [PatientGuard] },
	// { path: 'patient/dashboard/medical-decisions', component: MedicalDecisionsComponent, canActivate: [PatientGuard] },
	// { path: 'patient/dashboard/physical-side-effects', component: PhysicalSideEffectsComponent, canActivate: [PatientGuard] },
	// { path: 'patient/dashboard/non-physical-side-effects', component: NonPhysicalSideEffectsComponent, canActivate: [PatientGuard] },
	// { path: 'patient/dashboard/quality-of-life', component: QualityOfLifeComponent, canActivate: [PatientGuard] },
	// Questionnaire
	{
		path: "patient/dashboard/pro-ctcae",
		component: ProCtcaeComponent,
		canActivate: [PatientGuard]
	},
	{
		path: "patient/dashboard/promis",
		component: PromisComponent,
		canActivate: [PatientGuard]
	},
	{
		path: "patient/dashboard/fact-g7",
		component: FactG7Component,
		canActivate: [PatientGuard]
	},
	{
		path: "patient/dashboard/decision-making",
		component: DecisionMakingComponent,
		canActivate: [PatientGuard]
	},
	{
		path: "patient/dashboard/ies",
		component: IesComponent,
		canActivate: [PatientGuard]
	},
	{
		path: "patient/dashboard/report",
		component: ReportComponent,
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

	
	// {
	// 	path: "patient/dashboard/:chapter/:topic",
	// 	component: ChaptersComponent,
	// 	canActivate: [PatientGuard]
	// },

	// {
	// 	path: "patient/dashboard/:chapter/:topic/:sub_topic",
	// 	component: ChaptersComponent,
	// 	canActivate: [PatientGuard]
	// },


	// Researcher Routes
	{
		path: "researcher/dashboard",
		component: ResearcherDashboardComponent,
		canActivate: [ResearcherGuard]
	},
	{
		path: "researcher/profile",
		component: ResearcherProfileComponent,
		canActivate: [ResearcherGuard]
	},
	{
		path: "researcher/add-patient",
		component: AddPatientComponent,
		canActivate: [ResearcherGuard]
	},
	{
		path: "researcher/patients",
		component: ListPatientsComponent,
		canActivate: [ResearcherGuard]
	},
	{
		path: "researcher/patient-details/:user_id",
		component: PatientDetailsComponent,
		canActivate: [ResearcherGuard]
	},
	{
		path: "researcher/add-provider",
		component: AddProviderComponent,
		canActivate: [ResearcherGuard]
	},
	{
		path: "researcher/providers",
		component: ListProvidersComponent,
		canActivate: [ResearcherGuard]
	},
	{
		path: "researcher/edit-patient/:user_id",
		component: EditPatientComponent,
		canActivate: [ResearcherGuard]
	},
	{
		path: "researcher/patient-report/:user_id",
		component: ReportComponent,
		canActivate: [ResearcherGuard]
	},

	// Provider Routes
	{
		path: "provider/dashboard",
		component: ResearcherDashboardComponent,
		canActivate: [ProviderGuard]
	},
	{
		path: "provider/profile",
		component: ResearcherProfileComponent,
		canActivate: [ProviderGuard]
	},
	{
		path: "provider/patients",
		component: ListPatientsComponent,
		canActivate: [ProviderGuard]
	},
	{
		path: "provider/patient-details/:user_id",
		component: PatientDetailsComponent,
		canActivate: [ProviderGuard]
	},
	{
		path: "provider/patient-report/:user_id",
		component: ReportComponent,
		canActivate: [ProviderGuard]
	},
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
