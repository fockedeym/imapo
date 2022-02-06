import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms' ;
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrightComponent } from './bright/bright.component';
import { CropComponent } from './crop/crop.component';
import { StretchComponent } from './stretch/stretch.component';
import { HistoEqualComponent } from './histo-equal/histo-equal.component';
import { ExifComponent } from './exif/exif.component';
import { DomainComponent } from './domain/domain.component';
import { BasicComponent } from './basic/basic.component';
import { CompressionComponent } from './compression/compression.component';
import { ContrastComponent } from './contrast/contrast.component';
import { AiComponent } from './ai/ai.component';
import { AppRoutingModule } from "./app-routing.module";
import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ResizeComponent } from './resize/resize.component';
import { ElaComponent } from './ela/ela.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ImapoImageComponent } from './imapo-image/imapo-image.component';
import { HumanSegComponent } from './human-seg/human-seg.component';
import { FilterComponent } from './filter/filter.component';
import { FilterSelectionComponent } from './filter-selection/filter-selection.component';
import { MetadataComponent } from './metadata/metadata.component';
import { XmpComponent } from './xmp/xmp.component';
import { QuantizationTableComponent } from './quantization-table/quantization-table.component';
import { IntroductionComponent } from './introduction/introduction.component';
@NgModule({
  declarations: [
    AppComponent,
    BrightComponent,
    CropComponent,
    StretchComponent,
    HistoEqualComponent,
    ExifComponent,
    DomainComponent,
    BasicComponent,
    CompressionComponent,
    ContrastComponent,
    AiComponent,
    ImageLoaderComponent,
    HeaderComponent,
    FooterComponent,
    ResizeComponent,
    ElaComponent,
    ImapoImageComponent,
    HumanSegComponent,
    FilterComponent,
    FilterSelectionComponent,
    MetadataComponent,
    XmpComponent,
    QuantizationTableComponent,
    IntroductionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxImageZoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
