const mjml2html  = require('mjml');
const fs         = require('fs');
const cheerio    = require('cheerio');
const pretty     = require('pretty');

const LineaColoresRoute = "./src/components/lineaColoresBR.mjml";
const LogoRoute = "./src/components/logoBR.mjml";
const PreHero = "./src/components/PreHeroBR.mjml";
const FooterRoute = "./src/components/footerBR.mjml";
const bannerRoute = "./src/components/bannerBR.mjml";
const bodyWidth = "600px";

const emails = [
  {
    name: 'OE_Latam-Leveling_Test_Journey-EM0-A1',
    route: './src/components/content/A1.mjml',
    linkHero: 'https://image.communications.openenglish.com/lib/fe9113727760037c72/m/4/f79f11a3-2a85-4559-8ba0-c1e2d2e8a507.png'
  },
  {
    name: 'OE_Latam-Leveling_Test_Journey-EM0-A2',
    route: './src/components/content/A2.mjml',
    linkHero: 'https://image.communications.openenglish.com/lib/fe9113727760037c72/m/4/4a3fb61d-a635-41ae-9779-7cb06f4d7427.png'
  },
  {
    name: 'OE_Latam-Leveling_Test_Journey-EM0-B1',
    route: './src/components/content/B1.mjml',
    linkHero: 'https://image.communications.openenglish.com/lib/fe9113727760037c72/m/4/7180dbe0-de8f-4dbd-949a-00033d87dae0.png'
  }
];

// const fs = require('fs')

// const folderName = '/Users/joe/test'

// try {
//   if (!fs.existsSync(folderName)) {
//     fs.mkdirSync(folderName)
//   }
// } catch (err) {
//   console.error(err)
// }

console.log(emails[0].name);
console.log(emails[0].route);

let ContentRoute = emailsBR[2].route;
let nameFile = emailsBR[2].name;
let linkHero = emailsBR[2].linkHero;

const htmlAttr = `
<mj-html-attributes>
    <mj-selector path=".CtaN1 a">
        <mj-html-attribute name="alias">CtaOne-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".CtaN2 a">
        <mj-html-attribute name="alias">CtaTwo-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".LinkN1 a">
        <mj-html-attribute name="alias">LinkOne-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".LinkN2 a">
        <mj-html-attribute name="alias">LinkTwo-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".LinkN3 a">
        <mj-html-attribute name="alias">LinkThree-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".logo__mobile a">
        <mj-html-attribute name="alias">Logo-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".phone__number a">
        <mj-html-attribute name="alias">PhoneNumber-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".phone-footer a">
        <mj-html-attribute name="alias">PhoneNumberTwo-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".fb-link a">
        <mj-html-attribute name="alias">Facebook-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".tw-link a">
        <mj-html-attribute name="alias">Twitter-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".it-link a">
        <mj-html-attribute name="alias">Instagram-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".yt-link a">
        <mj-html-attribute name="alias">Yotube-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".ln-link a">
        <mj-html-attribute name="alias">Linkedin-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".legals a:nth-child(1)">
        <mj-html-attribute name="alias">Blog-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".legals a:nth-child(2)">
        <mj-html-attribute name="alias">Terminos-${nameFile}</mj-html-attribute>
    </mj-selector>

    <mj-selector path=".legals a:nth-child(3)">
        <mj-html-attribute name="alias">Politica-${nameFile}</mj-html-attribute>
    </mj-selector>
</mj-html-attributes>
`;

const headStr = `
  <mj-head >
      ${htmlAttr}
      <mj-title></mj-title>
      <mj-font name="Muli" href="https://fonts.googleapis.com/css?family=Muli:400,700,900&display=swap" />
      <mj-attributes>
          <mj-all font-family="Arial, Helvetica, sans-serif" />
          <mj-text align="left" />
          <mj-section background-color="#FFFFFF" />
      </mj-attributes>
      <mj-style>
        .rounded > table { 
          border-collapse: separate !important;
          border-radius: 12px; 
        }

        @media only screen and (max-width:480px) {
          .padding__mobile {
            padding: 25px 10px 0px !important;
          }

          .logo__mobile {
            padding: 0px 10px !important;
          }

          .phone__number {
            padding: 10px !important;
          }

          .phone__number table tbody tr td a {
            font-size: 12px !important;
            padding: 10px 15px !important;
          }

          .table__mobile {
            padding-left: 15px !important;
          }

          .border-none table {
            border: none !important;
          }

          .image-left {}

        }

        @media only screen and (max-width:330px) {
          .phone__number table tbody tr td a {
            font-size: 10px !important;
            padding: 7px 10px !important;
          }
        }
      </mj-style>
  </mj-head>`;

const heroStr = `
<!--Hero-->
<mj-section padding="0px" background-color="#FFFFFF" direction="rtl">
  <mj-column background-color="#FFFFFF" width="100%">
    <mj-image align="left" src="${linkHero}" alt="Este é o seu resultado:" href="https://www.openenglish.com.br/curso/" target="_blank" padding="10px" width="100%" />
  </mj-column>
</mj-section>
<!--End Hero-->
`;

const htmlOutput = mjml2html(`
  <mjml lang="pt">

    ${headStr}

    <mj-body background-color="#F5F5F5" width="${bodyWidth}">
        <mj-include path="${LineaColoresRoute}">
        <mj-include path="${LogoRoute}">
        <mj-include path="${PreHero}">
        ${heroStr}
        <mj-include path="${ContentRoute}">
        <mj-include path="${bannerRoute}">
        <mj-include path="${FooterRoute}">
    </mj-body>
  </mjml>
`,{
    beautify: true,
});




fs.writeFileSync(`finals/${nameFile}.html`, `${htmlOutput.html}`, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }else{
        console.log("The file was saved!");
    }
});

fs.readFile(`finals/${nameFile}.html`,
        {encoding:'utf8', flag:'r'},
        function(err, data) {
    if(err)
        console.log(err);
    else
        console.log('exiitooo');
});

let customTrack = `
<custom name="opencounter" type="tracking">
  <img src="https://pixel.app.returnpath.net/pixel.gif?r=513f82da18b8bbaec0871a756c303b534295828c&country=%%=Lowercase(@country)=%%&campaign=%%jobid%%" width="1" height="1" />
</custom>
`;

let $ = require('cheerio').load(htmlOutput.html)

$.html();
console.log('entró')

fs.writeFileSync(`public/${nameFile}.html`, `${pretty($.html())}`, 'utf8', function (err) {
  if (err) {
      return console.log(err);
  }else{
      console.log("The file was saved!");
  }
});