import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { Tooltip } from "@mui/material"
import ArticleIcon from '@mui/icons-material/Article';
import { RelatorioBem } from '../Relatorio/RelatorioBem';
import ReactToPrint from 'react-to-print';
import { useState } from 'react';
import { useReactToPrint } from 'react-to-print'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useApiRequestGet } from '../../services/api';
import { useEffect } from 'react';


export const MainListItems = () => {
  const [session, setSession] = React.useState(JSON.parse(localStorage.getItem('session')) || null);
  const [token, setToken] = React.useState(localStorage.getItem('token') || null);

  // const componentRef = React.useRef(null);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const { data } = useApiRequestGet('/listar-produtos-permissao');
  const [documentoPDF, setDocumentoPDF] = useState(null);


  const CriaCorpoDocumento = () => {
    if (!data) return []; // Retorna uma matriz vazia se não houver dados

    return data.map(item => [item.descricao, item.numeroPatrimonio, item.localOndeEncontra, item.situacao]);
  };

  const GerarDocumento = corpoDocumento => {
    return {
      content: [
        { text: 'Relatório de Bens da Prefeitura Municipal de Itajubá', style: 'header', alignment: 'center' },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['NOME DO BEM', 'PATRIMÔNIO', 'LOCALIZAÇÃO', 'SITUAÇÃO'],
              ...corpoDocumento
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        // outras definições de estilo aqui
      },
    };
  };

  const handleClick = () => {
    const corpoDocumento = CriaCorpoDocumento();
    const documento = GerarDocumento(corpoDocumento);
    pdfMake.createPdf(documento).open();
  };


  



  return (
    <div>
      <Tooltip title={!open ? "Início" : ""} placement="right-start">
        <NavLink to='/' style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Início" />
          </ListItemButton>
        </NavLink>
      </Tooltip>

      { session && <Tooltip title={!open ? "Postar" : ""} placement="right-start">
        <NavLink to='/postar' style={{ textDecoration: 'none', color: 'black' }}>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Postar" />
          </ListItemButton>
        </NavLink>
      </Tooltip>
      }

      {/* {session && session.id === '6d7e1dfe-ceb7-4951-9d75-d431df10a77e' && (
        <Tooltip title="Relatório" placement="right-start">
          <ListItemButton>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Gerar Relatório" />
          </ListItemButton>
        </Tooltip>
      )} */}

{session && session.permissaoId === 'e6d935c0-fc71-4918-b609-8785773d02f2' && (
        <div>
          <Tooltip title="Relatório" placement="right-start">
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Gerar Relatório" />
            </ListItemButton>
          </Tooltip>
          {/* <RelatorioBem open={modalAberto} onClose={fecharModal} /> */}
        </div>
      )}
    </div>
  );
}

// </ListItemIcon>
//             <ListItemText primary="Início" />
//           </ListItemButton>
//         </NavLink>
//       </Tooltip>

//       {session && <Tooltip title={!open ? "Postar" : ""} placement="right-start">
//         <NavLink to='/postar' style={{ textDecoration: 'none', color: 'black' }}>
//           <ListItemButton>
//             <ListItemIcon>
//               <ShoppingCartIcon />
//             </ListItemIcon>
//             <ListItemText primary="Postar" />
//           </ListItemButton>
//         </NavLink>
//       </Tooltip>}

//       {session && session.id === '6d7e1dfe-ceb7-4951-9d75-d431df10a77e' && (
//         <Tooltip title="Relatório" placement="right-start">
//           <ListItemButton onClick={abrirModal}>
//             <ListItemIcon>
//               <ArticleIcon />
//             </ListItemIcon>
//             <ListItemText primary="Gerar Relatório" />
//           </ListItemButton>
//         </Tooltip>
//       )}

//       <RelatorioBem open={modalAberto} onClose={fecharModal} />
//     </div>
//   );
// }