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
import { ToastrModule } from 'ngx-toastr';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
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
import { MyReflectionsComponent } from './components/my-reflections/my-reflections.component';
import { InquiryMoodModalComponent } from './components/sub-components/inquiry-mood-modal/inquiry-mood-modal.component';




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
		BreadcrumbComponent,
		ChaptersComponent,
		MyfavoritesComponent,
		AchievementsandeventsComponent,
		QuestionnaireComponent,
		SafeHtmlPipe,
		MyReflectionsComponent,
		InquiryMoodModalComponent,
	],
	imports: [
		BrowserModule,
		NgxYoutubePlayerModule.forRoot(),
		BrowserAnimationsModule,
		CONST_ROUTING,
		CollapseModule.forRoot(),
		AccordionModule.forRoot(),
		BsDropdownModule.forRoot(),
		BsDatepickerModule.forRoot(),
		ModalModule.forRoot(),
		AmChartsModule,
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
