import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { BasicComponent } from "./basic/basic.component";
import { MetadataComponent } from "./metadata/metadata.component";
import { CompressionComponent } from "./compression/compression.component";
import { ContrastComponent } from "./contrast/contrast.component";
import { DomainComponent } from "./domain/domain.component";
import { AiComponent } from "./ai/ai.component";
import { FilterComponent } from "./filter/filter.component";
import { MorphoComponent } from "./morpho/morpho.component";
import { IntroductionComponent } from "./introduction/introduction.component";



const routes: Routes = [

  { path: "basic",component: BasicComponent,},
  { path: "metadata", component: MetadataComponent,},
  { path: "compression", component: CompressionComponent },
  { path: "contrast", component: ContrastComponent },
  { path: "domain", component: DomainComponent },
  { path: "ai", component: AiComponent },
  { path: "filter", component: FilterComponent },
  { path: "morpho", component: MorphoComponent },
  { path: "", component: IntroductionComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
