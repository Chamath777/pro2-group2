import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js'
import { GetPlayerProgress } from "./getData.mjs";

async function ViewScoreHandler()
{
	const viewScoreModal = document.querySelector("#view-score-modal");
	viewScoreModal.classList.toggle("is-active");

	const playerProgressData = await GetPlayerProgress();
	const labels = await GetGraphLabels(playerProgressData);
	const chartData = await GetData(playerProgressData);
	const data = 
	{
		labels: labels,
		datasets:
		[
			{
				label: "Coins",
				borderColor: 'rgb(228, 228, 94)',
				data: chartData[0],
			},
			{
				label: "Food",
				borderColor: 'rgb(255, 99, 132)',
				data: chartData[1],
			},
			{
				label: "Workers",
				borderColor: 'rgb(60, 60, 200)',
				data: chartData[2],
			},
			{
				label: "Horses",
				borderColor: 'rgb(100, 200, 100)',
				data: chartData[3],
			}
		]
	};

	const config =
	{
		type: "line",
		data: data,
		options: {}
	};

	const chartElement = document.getElementById("progress-chart");
	new Chart(chartElement, config);
}

async function GetGraphLabels(playerProgressData)
{
	let labels = [];
	for (let i = 0; i < playerProgressData.length; i++) labels.push(i);
	return labels;
}

async function GetData(playerProgressData)
{
	let data = [[],[],[],[]];
	for (let i = 0; i < playerProgressData.length; i++) 
	{
		data[0].push(playerProgressData[i].coins);
		data[1].push(playerProgressData[i].food);
		data[2].push(playerProgressData[i].workers);
		data[3].push(playerProgressData[i].horses);
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