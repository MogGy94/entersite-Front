import React, { useState, useContext, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import FindInPage from '@material-ui/icons/FindInPage';
import Description from '@material-ui/icons/Description';


import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Typography from '@material-ui/core/Typography';
import { Button, IconButton, Tooltip } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { styles } from './styles_PDFViewer';

import { ContextPDFValidator } from '../../../views/PDFValidatorView/ContextPDFValidator';
import { ContextAppSession } from '../../../ContextAppSession';


pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(styles);

const PDFViewer = (props) => {
	const classes = useStyles();
	const { positionCss } = props;
	const { actualDocument,/////ORIGINAL / PROCESADO
		pdfOriginal,
		pdfProcesado,
		actulaDocumentRegistro,
		getActualDocument,
		setActualDocument
	} = useContext(ContextPDFValidator);
	const [documentFile, setDocumentFile] = useState(pdfOriginal);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [fileHeader, setFileHeader] = useState("NO SET");
	const [pageScale, setPageScale] = useState(1);
	const [pages, setPages] = useState("");

	/* console.log(actulaDocument); */
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		onSetPages();
	}
	const onChangeActualDocument = () => {
		console.log(actualDocument);
		if (actualDocument === "ORIGINAL") {
			setActualDocument("PROCESADO");
		} else if (actualDocument === "PROCESADO") {
			setActualDocument("ORIGINAL");
		}
	}

	const onScalePage = (zoom) => {
		if (zoom === "in") {
			setPageScale(pageScale + .2)
			console.log("zoom--in");
		} else if (zoom === "out") {
			setPageScale(pageScale - .2)
			console.log("zoom--out");
		}
	}
	const onSetPages = () => {
		const pSet = new Array(numPages).fill(1).map(
			(i, n) => (
				<Page
					/* width={(window.outerWidth) / 2} */
					key={`page_${n}`}
					className={classes.page}
					pageNumber={n + 1}
					scale={pageScale}
				/>
			)
		);
		setPages(pSet);
	}
	useEffect(() => {
		setDocumentFile(getActualDocument())

	}, [actualDocument, pdfOriginal, pdfProcesado])

	useEffect(() => {
		onSetPages();
	}, [pageScale])


	return (
		<div className={`${positionCss}`}>
			<Card className={classes.root}>
				<CardContent className={classes.container}>
					<div className={classes.toolBar}>
						<ToolBar
							{...{ onScalePage, onChangeActualDocument }}
						/>
					</div>

					<Document
						/* file={pdfOriginal} */
						file={documentFile}
						onLoadSuccess={onDocumentLoadSuccess}
						className={classes.content}
					>
						{pages}
					</Document>

					{/*<p>Page {pageNumber} of {numPages}</p>*/}
				</CardContent>
			</Card>
		</div>
	)
}

const ToolBar = (props) => {
	const { onScalePage, onChangeActualDocument } = props
	const classes = useStyles();
	return (
		<>
			<RelatedDocuments></RelatedDocuments>
			<div className="">
				<Tooltip title="Buscar">
					<IconButton size="medium" >
						<FindInPage />
					</IconButton>
				</Tooltip>
				<InputBase
					className={classes.input}
					placeholder="Buscar Texto"
					inputProps={{ 'aria-label': 'search google maps' }}
				/>
			</div>

			<Tooltip title="Original / Procesado">
				<IconButton
					onClick={() => onChangeActualDocument()}
					size="small">
					<Description />
				</IconButton>
			</Tooltip>

			<Tooltip title="Alejar">
				<IconButton onClick={() => onScalePage('out')} size="small">
					<ZoomOutIcon />
				</IconButton>
			</Tooltip>

			<Tooltip title="Acercar">
				<IconButton onClick={() => onScalePage('in')} size="small" >
					<ZoomInIcon />
				</IconButton>
			</Tooltip>
		</>
	)
}

const RelatedDocuments = () => {
	const classes = useStyles();
	const [age, setAge] = useState('');
	const [docuemntsAsociated, setDocumentsAsociated] = useState([])
	const { assignedDocuments } = useContext(ContextAppSession);
	const { setActualDocumentID } = useContext(ContextPDFValidator);
	/* const { actulaDocumentRegistro, setActulaDocument } = useContext(ContextPDFValidator); */

	const handleChange = (event) => {
		const newDocumentSelected = event.target.value;
		setAge(newDocumentSelected);

		setActualDocumentID(newDocumentSelected);
	};

	useEffect(() => {
		const idsLists = assignedDocuments.map((id, n) => {
			return <MenuItem key={`tag-${n}`} value={id}>{id}</MenuItem>
		})
		setDocumentsAsociated(idsLists);
	}, [assignedDocuments]);

	return (

		<FormControl className={classes.formControl}>
			<InputLabel id="demo-simple-select-helper-label">{"Documentos"}</InputLabel>
			<Select
				labelId="demo-simple-select-helper-label"
				id="demo-simple-select-helper"
				value={age}
				onChange={handleChange}
				defaultValue={assignedDocuments}
			>
				{docuemntsAsociated}
			</Select>
			<FormHelperText>Selector de Documento</FormHelperText>
		</FormControl>

	)
}
export default PDFViewer;
