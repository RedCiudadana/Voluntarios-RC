<?php
/**
 * This file processes the newsletter form.
 * It sends an email with the posted email to the specified address.
 *
 * You need to specify the receiving email in the $to variable.
 * You can also change the email title in the $subject variable and the email body in the $message variable.
 *
 * This file has basic form processing functionality. You can modify it or code your own functionality based on your requirements.
 */

// The address to which the email is sent.
$to = '';

// The email title.
$subject = 'Sidebar Newsletter';

// Verifies if the receiving email is empty.
if (empty($to)) {
	$response = array(
		'status' => false,
		'message' => 'The receiving email is not configured in the PHP file.'
	);
} else {
	
	// Gets and sanitizes the posted data.
	$post_email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

	// Verifies if the sanitized data is invalid.
	if (!filter_var($post_email, FILTER_VALIDATE_EMAIL)) {
		$response = array(
			'status' => false,
			'message' => 'Invalid data was submitted.'
		);
	} else {
		
		// The email body.
		$message = 'Email: ' . $post_email;

		// The 'From' header.
		$headers = 'From: ' . $post_email . ' <' . $post_email . '>';

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