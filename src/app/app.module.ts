// Add node module
import { AgmCoreModule } from '@agm/core';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';
// Add Bootstrap module
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { MomentModule } from 'angular2-moment';
// import { FileUploadModule } from 'ng2-file-upload';
// import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastrModule } from 'ngx-toastr';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgControlsModule } from 'videogular2/controls';
import { VgCoreModule } from 'videogular2/core';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { AppComponent } from './app.component';
// Add Routes
import { CONST_ROUTING } from './app.routing';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AchievementsandeventsComponent } from './components/achievementsandevents/achievementsandevents.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
// import { BreastCancerTreatmentComponent } from './components/chapter-1/breast-cancer/breast-cancer-treatment/breast-cancer-treatment.component';
// import { WhatDoesnotCauseBreastCancerComponent } from './components/chapter-1/breast-cancer/what-doesnot-cause-breast-cancer/what-doesnot-cause-breast-cancer.component';
// import { WhatIsBreastCancerComponent } from './components/chapter-1/breast-cancer/what-is-breast-cancer/what-is-breast-cancer.component';
// import { WhoGetsBreastCancerComponent } from './components/chapter-1/breast-cancer/who-gets-breast-cancer/who-gets-breast-cancer.component';
// import { WhoTreatsBreastCancerComponent } from './components/chapter-1/breast-cancer/who-treats-breast-cancer/who-treats-breast-cancer.component';
// import { UnderstandingBreastCancerComponent } from './components/chapter-1/understanding-breast-cancer/understanding-breast-cancer.component';
// import { BreastCancerScreeningComponent } from './components/chapter-1/wellness/breast-cancer-screening/breast-cancer-screening.component';
// import { CervicalCancerScreeningComponent } from './components/chapter-1/wellness/cervical-cancer-screening/cervical-cancer-screening.component';
// import { ColorectalCancerScreeningComponent } from './components/chapter-1/wellness/colorectal-cancer-screening/colorectal-cancer-screening.component';
// import { LungCancerScreeningComponent } from './components/chapter-1/wellness/lung-cancer-screening/lung-cancer-screening.component';
// import { PreventSecondCancerComponent } from './components/chapter-1/wellness/prevent-second-cancer/prevent-second-cancer.component';
// import { SecondCancerComponent } from './components/chapter-1/wellness/second-cancer/second-cancer.component';
// import { SkinCancerScreeningComponent } from './components/chapter-1/wellness/skin-cancer-screening/skin-cancer-screening.component';
// import { SunProtectionComponent } from './components/chapter-1/wellness/sun-protection/sun-protection.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FaqComponent } from './components/faq/faq.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// Add Component
import { HomeComponent } from './components/home/home.component';
import { MyfavoritesComponent } from './components/myfavorites/myfavorites.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { ReportComponent } from './components/report/report.component';
import { ResoursesComponent } from './components/resourses/resourses.component';
import { BreadcrumbComponent } from './components/sub-components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/sub-components/footer/footer.component';
import { HeaderComponent } from './components/sub-components/header/header.component';
import { InnerPageHeaderComponent } from './components/sub-components/inner-page-header/inner-page-header.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { PatientGuard } from './guards/patient.guard';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
// Add Service
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';
import { HelperService } from './service/helper.service';
import { QuestionnaireService } from './service/questionnaire.service';



@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		HeaderComponent,
		FooterComponent,
		DashboardComponent,
		ResoursesComponent,
		PageNotFoundComponent,
		ProfileComponent,
		AboutUsComponent,
		FaqComponent,
		ContactUsComponent,
		ReportComponent,
		TermsConditionsComponent,
		ChangePasswordComponent,
		InnerPageHeaderComponent,
		ForgotPasswordComponent,
		// UnderstandingBreastCancerComponent,
		// EatWellFeelWellComponent,
		// HealthyMindComponent,
		// HealthyAtAnyAgeComponent,
		// StayingActiveComponent,
		// CareAfterCancerComponent,
		// LifeAfterCancerComponent,
		// WrappingUpComponent,
		// WhatIsBreastCancerComponent,
		// WhoGetsBreastCancerComponent,
		// WhatDoesnotCauseBreastCancerComponent,
		// BreastCancerTreatmentComponent,
		// WhoTreatsBreastCancerComponent,
		// SecondCancerComponent,
		// BreastCancerScreeningComponent,
		// CervicalCancerScreeningComponent,
		// ColorectalCancerScreeningComponent,
		// LungCancerScreeningComponent,
		// SkinCancerScreeningComponent,
		// PreventSecondCancerComponent,
		// SunProtectionComponent,
		BreadcrumbComponent,
		ChaptersComponent,
		MyfavoritesComponent,
		AchievementsandeventsComponent,
		QuestionnaireComponent,
		SafeHtmlPipe,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CONST_ROUTING,
		CollapseModule.forRoot(),
		AccordionModule.forRoot(),
		BsDropdownModule.forRoot(),
		BsDatepickerModule.forRoot(),
		ModalModule.forRoot(),
		AmChartsModule,
		// FileUploadModule,
		AgmCoreModule.forRoot({ apiKey: 'AIzaSyByUvWAEZcrVWERyl2q1q3dECxFLuQVqWI' }),
		Ng4LoadingSpinnerModule.forRoot(),
		HttpModule,
		VgControlsModule,
		VgCoreModule,
		VgOverlayPlayModule,
		VgBufferingModule,
		FormsModule,
		ReactiveFormsModule,
		ToastrModule.forRoot({
			preventDuplicates:true,
			enableHtml:true,
		}),
		HttpClientModule,
		// MomentModule,
		NgIdleKeepaliveModule.forRoot(),
	],
	providers: [
		HttpClientModule,
		PatientGuard,
		AuthService,
		HelperService,
		QuestionnaireService,
		DataService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
