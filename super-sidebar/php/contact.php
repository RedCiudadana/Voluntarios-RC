<?php
/**
 * This file processes the contact form.
 * It sends an email with the posted data to the specified address.
 *
 * You need to specify the receiving email in the $to variable.
 * You can also change the email title in the $subject variable and the email body in the $message variable.
 *
 * This file has basic form processing functionality. You can modify it or code your own functionality based on your requirements.
 */

// The address to which the email is sent.
$to = '';

// The email title.
$subject = 'Sidebar Contact';

// Verifies if the receiving email is empty.
if (empty($to)) {
	$response = array(
		'status' => false,
		'message' => 'The receiving email is not configured in the PHP file.'
	);
} else {
	
	// Gets and sanitizes the posted data.
	$post_name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
	$post_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
	$post_msg = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

	// Verifies if any of the sanitized data is invalid.
	if (empty($post_name) || !filter_var($post_email, FILTER_VALIDATE_EMAIL) || empty($post_msg)) {
		$response = array(
			'status' => false,
			'message' => 'Invalid data was submitted.'
		);
	} else {
		
		// The email body.
		$message = 'Name: ' . $post_name . "\n\n" .
				   'Email: ' . $post_email . "\n\n" .
				   'Message: ' . $post_msg;

		// The 'From' header.
		$headers = 'From: ' . $post_name . ' <' . $post_email . '>';

		// Sends the email.
		$status = mail($to, $subject, $message, $headers);

		// Creates the reponse.
		$response = array(
			'status' => $status
		);
	}
}

// Outputs the response.
echo json_encode($response);

?>