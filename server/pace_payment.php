<?php
$url = 'https://trans.pacepayment.com/cgi-bin/process.cgi';
$params = "action=ns_quicksale_cc" . "&" .
        "acctid=PAB66" . "&" .
        "merchantpin=ZLWTH2IPZ8WBVYBZ2HH4MLVP7706PY0I" . "&" .
        "amount=1.00" . "&" .
        "ccname=TonyTest" . "&" .
        "ccnum=4111111111111111" . "&" .
        "expmon=09" . "&" .
        "expyear=2017";
$ch = curl_init();
curl_setopt($ch, CURLOPT_POST,1);
curl_setopt($ch, CURLOPT_POSTFIELDS,$params);
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,  2);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
$result=curl_exec ($ch);

curl_close($ch);
if ($result == "")
{
	echo("No Response\n");
	exit;
} else {
	echo("$result");
	exit;
} 

?>


