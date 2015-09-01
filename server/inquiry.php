<?php
//error_reporting(0);
define('API_USER', 'test');
define('API_KEY', 'Test123');
define('API_URL', 'https://api.cardquiry.com:8080');

function authenticate($method, $content_type, $canonicalized_resource, $canonicalized_POST_Variables) {
	$string_to_sign = "";
	$string_to_sign .= $method . "\n";
	$string_to_sign .= $content_type . "\n";
	$date = new DateTime('now', new DateTimeZone('UTC'));
	$date = $date->format(DateTime::RFC2822);
	$string_to_sign .= $date . "\n";

	$string_to_sign .= $canonicalized_POST_Variables . $canonicalized_resource;
	//echo "\nSTRING_TO_SIGN:" . $string_to_sign;

	$signature = trim(base64_encode(hash_hmac('sha1', $string_to_sign, API_KEY, true)));

	// echo "\nSIGNATURE:" .$signature;
	return "CFA" . " " . API_USER . ":" . $signature;

}

function get_balance($retailer_id, $card_number, $pin, $version) {
	$method = "POST";
	$content_type = "application/x-www-form-urlencoded";
	$service_path = "/api/giftcardbalance";

	//build the data to get sent in POST request
	$data_to_post = array(
		'retailerId' => $retailer_id,
		'cardNumber' => $card_number,
		'pin' => $pin,
		'version' => $version,
	);

	//use query string format for POST data in auth signiture
	$canonicalized_POST_Variables = http_build_query($data_to_post);

	//build authorize header for request
	$authorization = authenticate($method, $content_type, $service_path, $canonicalized_POST_Variables);

	//configure http request
	$endpoint = API_URL . $service_path;
	$date = new DateTime('now', new DateTimeZone('UTC'));
	$date = $date->format(DateTime::RFC2822);
	//set headers for http request
	$headers = array(
		'Authorization: ' . $authorization . '',
		'Date: ' . $date . '',
		'Content-Type: ' . $content_type . '',
	);
	//attach the post data to the http request
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $endpoint);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $canonicalized_POST_Variables);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HEADER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($curl, CURLINFO_HEADER_OUT, true);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
	$response = curl_exec($curl);
	$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	$http_message = curl_error($curl);

	// get header and body
	$header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
	$header = substr($response, 0, $header_size);
	$body = substr($response, $header_size);

	// print_r(($response));

	// die();
	if ($http_code == 200) {
		// Convert json response as array
		$result = json_decode($body, true);
	} else {
		// Get error msg
		$http_message = curl_error($curl);
		$result = json_decode($body, true);
	}

	curl_close($curl);
	return $result;
}

function get_delayed_balance($request_id) {
	$method = "GET";
	$content_type = "";
	$service_path = "/api/giftcardbalance/" . $request_id;

	//build authorize header for request
	$authorization = authenticate($method, $content_type, $service_path, "");

	//configure http request
	$endpoint = API_URL . $service_path;
	$date = new DateTime('now', new DateTimeZone('UTC'));
	$date = $date->format(DateTime::RFC2822);
	//set headers for http request
	$headers = array(
		'Authorization: ' . $authorization . '',
		'Date: ' . $date . '',
		'Content-Type: ' . $content_type . '',
	);
	//attach the post data to the http request
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $endpoint);
	curl_setopt($curl, CURLOPT_POST, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HEADER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($curl, CURLINFO_HEADER_OUT, true);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
	$response = curl_exec($curl);
	$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

	// get header and body
	$header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
	$header = substr($response, 0, $header_size);
	$body = substr($response, $header_size);

	if ($http_code == 200) {
		// Convert json response as array
		$result = json_decode($body, true);
	} else {
		// Get error msg
		$http_message = curl_error($curl);
		$result = json_decode($body, true);

	}
	curl_close($curl);

	return $result;
}

//////////////////////////////////////////////////////////////////////////////////////

// $card_number = "111111111111111xx"; // Enter the test card number here
// $retailer_id = '114'; // Retailer ID will be provided by CardQuiry for all supported retailers.
// $pin = "1234"; // Enter test card pin number here
// $version = '2';

$card_number = $argv[1];
$retailer_id = $argv[2];
$pin = $argv[3];
$version = '2';

$result = get_balance($retailer_id, $card_number, trim($pin), $version);

$ret = [
	"request" => [
		"card_number" => $card_number,
		"retailer_id" => $retailer_id,
		"pin" => $pin,
		"version" => $version,
	],
	"response" => $result,
];

print_r(json_encode($ret));

// echo "REQUEST ID " . $result["requestId"] . "\n";

// $delayedResult  = get_delayed_balance($result["requestId"]);

// print_r($delayedResult);

?>