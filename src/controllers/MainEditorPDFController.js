import * as pdfjsLib from 'pdfjs-dist';
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = '../../node_modules/pdfjs-dist/build/pdf.worker.js';

const url = 'http://localhost:3000/5786709.pdf';

const eventBus = new pdfjsViewer.EventBus();

function loadPdf(typedarray, scale = 1) {
  let loadingTask;
  if (typedarray === undefined) {
    loadingTask = pdfjsLib.getDocument(url);
  } else {
    loadingTask = pdfjsLib.getDocument(typedarray);
  }

  loadingTask.promise.then((pdf) => {
    console.log('Pdf loaded');
    console.log('Scale ', scale);
    console.log(`Pages ${pdf.numPages}`);

    for (let i = 1; i <= pdf.numPages; i++) {
      // console.log('Rendering ', i);
      pdf.getPage(i).then((page) => {
        const viewport = page.getViewport({ scale });

        const pageContainer = document.createElement('div');
        pageContainer.setAttribute('id', `page-${i}`);
        pageContainer.setAttribute('style', 'position: relative; margin: 8px');

        document.getElementById('pdf-container').append(pageContainer);

        const canvas = document.createElement('canvas');
        pageContainer.appendChild(canvas);

        const ctx = canvas.getContext('2d', { alpha: false });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport,
        };
        page.render(renderContext).promise.then(() =>
          // console.log('after render');
          page.getTextContent()).then((textContent) => {
          // console.log('Rendering text ', i);
          // console.log(textContent);
          const textLayerDiv = document.createElement('div');
          textLayerDiv.setAttribute('class', 'textLayer');

          pageContainer.appendChild(textLayerDiv);

          const textLayer = new pdfjsViewer.TextLayerBuilder({
            textLayerDiv,
            pageIndex: i,
            viewport,
            eventBus,
          });

          // console.log('Text layer ', textLayer);
          textLayer.setTextContent(textContent);

          textLayer.render();
          //ctx.fillRect(25, 25, 10, 10);
        }).catch((er) => { console.log(er); });
      });
    }
  });
}

function pdfCleanup() {
  document.querySelectorAll('div[id^="page"]').forEach((node) => { node.remove(); });
}

export { loadPdf, pdfCleanup };
