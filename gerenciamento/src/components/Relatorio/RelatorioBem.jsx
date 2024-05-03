import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useApiRequestGet } from '../../services/api';
import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


pdfMake.vfs = pdfFonts.pdfMake.vfs;




export class RelatorioBem extends React.Component {

  CriaCorpoDocumento(data) {
    const corpoDocumento = data.map(data => [data.descricao]);

    return corpoDocumento;
  }

  GerarDocumento(corpoDocumento) {
    const documento = {
      // header: 'cabeçalho',
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: corpoDocumento,
          },
        },
      ],
    };

    return documento;
  }

  handleClick = () => {
    const data = [
      { text: 'Oi' },
      { text: 'Olá' },
      { text: 'teste' },
      { text: 'teste 2' },
      corpoDocumento
    ];
    const corpoDocumento = this.CriaCorpoDocumento(data);
    const documento = this.GerarDocumento(corpoDocumento);
    pdfMake.createPdf(documento).open();
  };

  render() {
    const { open } = this.props;

    return (
      // <div>
      //   <button onClick={this.handleClick}>Gerar PDF</button>
      // </div>
      // <Tooltip title={!open ? "Gerar Relatório" : ""} placement="right-start">
      //   <ListItemButton onClick={this.handleClick}>
      //     <ListItemIcon>
      //       <PictureAsPdfIcon />
      //     </ListItemIcon>
      //     <ListItemText primary="Gerar Relatório" />
      //   </ListItemButton>
      // </Tooltip>
      <div>---</div>
    );
  }
}
