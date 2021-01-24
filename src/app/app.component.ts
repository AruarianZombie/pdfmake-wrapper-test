import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Img, IImg, Stack, Txt, IStack, IText, Ul } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';


PdfMakeWrapper.setFonts(pdfFonts);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pdfmake-wrapper-test';

  public pdf: PdfMakeWrapper;

  ngOnInit(): void {
  }

  public async downloadPdf() {
    this.pdf = new PdfMakeWrapper();
    this.pdf.images({
      covidLogo: await new Img('assets/img/covid-19.png').build()
    });


    const covidLogo: IImg = await new Img('covidLogo', true)
      .width(300)
      .height(300)
      .alignment('center')
      .margin([0, 0, 0, 10])
      .build();

    this.pdf.add(covidLogo);

    const mainInformation: IStack = new Stack([
      this.buildTitle('Protejete a ti mismo y otros del COVID-19'),
      this.buildMainIdeaParagraph('Si el COVID-19 se esparce en tu comunidad, mantente a salvo tomando precauciones simples, como distanciamiento, usar mascarilla, mantener cuartos/habitaciones bien ventiladas, evitar multitudes, lavar tus manos y cubrirse con el codo o con un pañuelo al toser.'),
      this.buildTitle('Que hacer para mantenerte a ti y otros a salvo del COVID-19'),
      new Ul([
        this.buildAdvice({
          advice: 'Mantener al menos un metro de distancia entre tu y los demás',
          mainIdea: 'para reducir riesgos de infeccion cuando tosan, estornuden o hablen. Mantener una distancia mayor entre tu y los demás en interiores. Mientras más lejos, mejor.'
        }),
        this.buildAdvice({
          advice: 'Has del uso de mascarilla algo normal cuando te encuentres alrededor de otras personas.',
          mainIdea: 'El uso apropiado, almacenamiento y limpieza son escenciales para que las mascarillas sean efectivas.'
        })
      ]).end
    ]).end;

    this.pdf.add(mainInformation);
    // this.pdf.add('Hello world!');
    this.pdf.create().download();
  }

  private buildTitle(title: string): IText {
    return new Txt(title)
      .bold()
      .color('#243257')
      .alignment('center')
      .margin([ 0, 0, 0, 5 ])
      .end
  }

  private buildMainIdeaParagraph(paragraph: string): IText {
    return new Txt(paragraph)
      .color('#2c76d0')
      .alignment('left')
      .fontSize(10)
      .margin([ 0, 0, 0, 5 ])
      .end;
  }

  private buildAdvice({ advice, mainIdea }: { advice: string, mainIdea: string }): IText {
    return new Txt([
      this.buildRemarkedAdvice(advice),
      this.buildMainIdeaParagraph(mainIdea)
    ]).end;
  }

  private buildRemarkedAdvice(advice: string): IText {
    return new Txt(`${advice} `)
      .color('#243257')
      .alignment('left')
      .fontSize(10)
      .bold()
      .end
  }

}
