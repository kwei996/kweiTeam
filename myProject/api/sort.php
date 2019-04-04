<?php
	include 'connect.php';
	$sql='SELECT * FROM itemlist';
	$res=$conn->query($sql);
	$row=$res->fetch_all(MYSQLI_ASSOC);
	echo json_encode($row);
?>