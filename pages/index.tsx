import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useRef } from "react";

const Home: NextPage = () => {
	const fileForm = useRef<HTMLFormElement>();
	const temporaryOutput = useRef<HTMLTextAreaElement>(null);

	function upload() {
		const formData = new FormData(fileForm.current);

		fetch(
			"/files/upload",
			{
				method: "post",
				body: formData
			}
		).then(response => {
			console.log(response);
			temporaryOutput.current!.value = response.toString();
		}).catch(error => console.log(error));
	}

	function download() {
		alert("TODO: download");
	}

	return (
		<div>
			<Container fluid as={"main"}>
				<Head>
					<title>Troubleshooter Editor</title>
					<meta name="description" content="Troubleshooter Editor"/>
					<link rel="icon" href="/favicon.ico"/>
				</Head>

				<Row>
					<Col>
						<h1 className={styles.title}>
							Troubleshooter Editor
						</h1>
					</Col>
				</Row>
				<Row as={"form"} ref={fileForm} className={"mt-4"}>
					<Col xs={2}>
						<input type={"file"} name={"file"} accept={".sav,.bak"}/>
					</Col>
					<Col xs={2}>
						<button type={"button"} onClick={upload}>Upload</button>
					</Col>
					<Col>
						<button type={"button"} onClick={download}>Save</button>
					</Col>
				</Row>
				<Row className={"mt-4"}>
					<Col>
						<textarea ref={temporaryOutput} readOnly={true} style={{ width: "100%", minHeight: "300px" }}/>
					</Col>
				</Row>
			</Container>

			<footer className={styles.footer}>
				<a
					href="https://github.com/Attacktive/troubleshooter-editor"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className={styles.logo}>
						<Image src="/github.svg" alt="GitHub Logo" width={36} height={36}/>
					</span>
				</a>
			</footer>
		</div>
	);
};

export default Home;
