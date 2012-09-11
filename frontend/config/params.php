<?php
/**
 * params.php
 *
 * Holds frontend specific application parameters.
 * @author: antonio ramirez <antonio@clevertech.biz>
 * Date: 7/22/12
 * Time: 1:38 PM
 */

$paramsLocalFile = $frontendConfigDir . DIRECTORY_SEPARATOR . 'params-local.php';
$paramsLocalFileArray = file_exists($paramsLocalFile) ? require($paramsLocalFile) : array();

$paramsEnvFile = $frontendConfigDir . DIRECTORY_SEPARATOR . 'params-env.php';
$paramsEnvFileArray = file_exists($paramsEnvFile) ? require($paramsEnvFile) : array();

$paramsCommonFile = $frontendConfigDir . DIRECTORY_SEPARATOR  . '..' . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR .
		'common' . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'params.php';

$paramsCommonArray = file_exists($paramsCommonFile) ? require($paramsCommonFile) : array();

return CMap::mergeArray(
	$paramsCommonArray,
	// merge frontend specific with resulting env-local merge *override by local
	CMap::mergeArray(
		array(
			'url.rules' => array(
				// REST patterns for login | logout, placed on SiteController
				array('site/login', 'pattern' => 'api/site/login', 'verb' => 'POST'),
				array('site/logout', 'pattern' => 'api/site/logout', 'verb' => 'POST'),
				/* for REST please @see http://www.yiiframework.com/wiki/175/how-to-create-a-rest-api/ */
                // REST Controller Patterns
				// specify the REST controllers names that lay on your "api" module
				// make sure the "api" module is initialized!
//                array('api/<controller>/list', 'pattern' => 'api/<controller:(controllernameA|controllernameB)>s', 'verb' => 'GET'),
//                array('api/<controller>/list', 'pattern' => 'api/<controller:(controllernameA|controllernameB)>s/<id:\d+>', 'verb' => 'GET'),
//                array('api/<controller>/create', 'pattern' => 'api/<controller:(controllernameA|controllernameB)>', 'verb' => 'POST'),
//                array('api/<controller>/read', 'pattern' => 'api/<controller:(controllernameA|controllernameB)>/<id:\d+>', 'verb' => 'GET'),
//                array('api/<controller>/update', 'pattern' => 'api/<controller:(controllernameA|controllernameB)>/<id:\d+>', 'verb' => 'PUT'),
//                array('api/<controller>/delete', 'pattern' => 'api/<controller:(controllernameA|controllernameB)>/<id:\d+>', 'verb' => 'DELETE'),
                
				/* other @see http://www.yiiframework.com/doc/guide/1.1/en/topics.url */
				'<controller:\w+>/<id:\d+>' => '<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
				'<controller:\w+>/<action:\w+>' => '<controller>/<action>',
			),
			// add here all frontend-specific parameters
		),
		// merge environment parameters with local *override by local
		CMap::mergeArray($paramsEnvFileArray, $paramsLocalFileArray)
	)
);