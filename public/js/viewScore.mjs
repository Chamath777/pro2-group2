import Chart from "chart.js/auto";
import { GetPlayerProgress } from "./getData.mjs";

async function ViewScoreHandler()
{
	const viewScoreModal = document.querySelector("#view-score-modal");
	viewScoreModal.classList.toggle("is-active");

	const playerProgressData = await GetPlayerProgress();
	const labels = GetGraphLabels(playerProgressData);
	const data = 
	{
		labels: labels,
		datasets:
		[{
			backgroundColor: 'rgb(255, 99, 132)',
      		borderColor: 'rgb(255, 99, 132)',
			data: GetGraphData(playerProgressData),
		}]
	};

	const config =
	{
		type: "line",
		data: data,
		options: {}
	};

	new Chart(document.getElementById("progress-chart"), config);
}

function GetGraphLabels(playerProgressData)
{
	let labels = [];
	for (let i = 0; i < playerProgressData.length; i++) labels.push(i);
	return labels;
}

function GetGraphData(playerProgressData)
{
	let data = [];
	for (let i = 0; i < playerProgressData.length; i++) 
	{
		data.push(playerProgressData[i].coins);
	}
	return data;
}

function SetupButtons() 
{
	const viewScoreButton = document.querySelector("#view-score");
	if (viewScoreButton) viewScoreButton.addEventListener("click", ViewScoreHandler);

	const viewScoreCloseButton = document.querySelector("#view-score-close");
	if (viewScoreCloseButton) viewScoreCloseButton.addEventListener("click", ViewScoreHandler);
}

SetupButtons();