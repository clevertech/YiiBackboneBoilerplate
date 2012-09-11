<?php

class SiteController extends Controller
{
	/**
	 * This action that controls whether
	 */
	public function actionIsLogged()
	{

		$data['authenticated'] = !Yii::app()->user->getIsGuest();
		if ($data['authenticated']) $data['username'] = Yii::app()->user->name;


		$this->sendResponse(200, CJSON::encode($data));
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{

		$this->render('index');
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if ($error = Yii::app()->errorHandler->error)
		{
			if (Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * This is the action to handle login
	 */
	public function actionLogin()
	{
		$data = $this->getInputAsJson();

		if(empty($data['username']) || empty($data['password']))
		{
			$this->sendResponse(401, 'Please, fill up all username and password to login!');
		}
		// Authenticate user credentials
		$identity = new UserIdentity($data['username'], $data['password']);

		if ($identity->authenticate())
		{

			Yii::app()->user->login($identity);

			$this->sendResponse(200, CJSON::encode(array('authenticated' => true)));
		} else
		{
			switch ($identity->errorCode)
			{
				case UserIdentity::ERROR_USERNAME_INVALID:
					$error = 'Incorrect username';
					break;
				case UserIdentity::ERROR_PASSWORD_INVALID:
					$error = 'Incorrect password';
					break;
				case UserIdentity::ERROR_USER_IS_DELETED:
					$error = 'This user is deleted';
					break;
			}

			$this->sendResponse(401, $error);
		}
	}

	/**
	 * This is the action to handle logout
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		$this->sendResponse(200, CJSON::encode(array('authenticated' => false)));
	}

}
