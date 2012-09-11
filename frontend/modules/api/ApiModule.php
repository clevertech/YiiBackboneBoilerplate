<?php
/**
 * ApiModule.php
 *
 * @author: antonio ramirez <antonio@clevertech.biz>
 * Date: 9/3/12
 * Time: 7:52 PM
 */
class ApiModule extends CWebModule {

	public function init(){
		parent::init();
		Yii::import('api.components.*');

		$components = array(
			'request' => array(
				'class' => 'HttpRequest',
				'enableCsrfValidation' => true,
			)
		);

		Yii::app()->setComponents($components, false);

		if(Yii::app()->user->isGuest)
			Yii::app()->user->loginRequired();
		else
			return true;

		return false;
	}
}