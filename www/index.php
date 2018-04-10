<?php

include_once('../loadLines.php');

?><!doctype HTML>
<html>
<head>
	<script src="js/howler.min.js"></script>
	<script src="js/jquery.min.js"></script>
	<script src="js/portal.js"></script>
	<link rel="Stylesheet" href="css/style.css" />
	<title>Portal Voice Creator</title>
</head>
<body>
	<h1>Portal Voice Box</h1>
	<section id="Clips">
	<?php
	foreach ($lines as $game => $gameData) {
		echo '<h2>' . htmlspecialchars($game) . '</h2>';
		foreach ($gameData as $speaker => $speakerData) {
			echo '<h3>' . htmlspecialchars($speaker) . '</h3>';
			echo '<ul>';
			foreach ($speakerData as $speakerDatum) {
				list($line, $lineUrl) = $speakerDatum;
				$lineUrl = explode('/', $lineUrl);
				$lineUrl = 'audio/' . array_pop($lineUrl);
				echo '<li data-src="' . htmlspecialchars($lineUrl) . '"><button class="PlayButton">&gt;</button><button class="AddButton">+</button><span>' . htmlspecialchars($line) . '</span></li>';
			}
			echo '</ul>';
		}
	}	
	?>
	</section>
	<div>
		<button id="PlayChain">Play</button>
		<button id="ClearChain">Clear</button>
	</div>
	<ul id="Chain"></ul>
</body>
</html>
