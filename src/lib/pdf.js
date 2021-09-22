import PdfPrinter from "pdfmake"

export const getPDFReadableStream = () => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "fonts/Roboto-Italic.ttf",
      bolditalics: "fonts/Roboto-MediumItalic.ttf",
    },
  }

  const printer = new PdfPrinter(fonts)

  const docDefinition = {
    content: ["Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"],
  }

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
  pdfReadableStream.end()

  return pdfReadableStream
}