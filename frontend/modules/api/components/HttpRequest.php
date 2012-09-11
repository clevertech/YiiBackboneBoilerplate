<?php
/**
 * Created by JetBrains PhpStorm.
 * User: antonio
 * Date: 5/21/12
 * Time: 6:09 PM
 * To change this template use File | Settings | File Templates.
 */
class HttpRequest extends CHttpRequest
{
    public function validateCsrfToken($event)
    {
        if($this->getIsPostRequest() && $this->getIsPutRequest())
        {
            // only validate POST requests
            // get the input
            $payload = CJSON::decode(file_get_contents('php://input'));

            $cookies=$this->getCookies();
            if($cookies->contains($this->csrfTokenName) && isset($payload[$this->csrfTokenName]))
            {
                $tokenFromCookie=$cookies->itemAt($this->csrfTokenName)->value;
                $tokenFromPost=$payload[$this->csrfTokenName];
                $valid=$tokenFromCookie===$tokenFromPost;
            }
            else
                $valid=false;
            if(!$valid)
                throw new CHttpException(400,Yii::t('yii','The CSRF token could not be verified.'));
        }
    }

}
