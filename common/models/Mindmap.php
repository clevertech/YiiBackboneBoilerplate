<?php

/**
 * This is the model class for table "mindmap".
 *
 * The followings are the available columns in table 'mindmap':
 * @property string $id
 * @property string $user_id
 * @property string $name
 */
class Mindmap extends CActiveRecord
{
    /**
     * Returns the static model of the specified AR class.
     * @return Mindmap the static model class
     */
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return 'mindmap';
    }

    public function beforeDelete()
    {
        /* remove all nodes attached to this mindmap */
        $sql = strtr('DELETE FROM {table} WHERE mindmap_id=:mindmap_id', array('{table}' => Node::model()->tableName()));
        try{

            Yii::app()->db
            ->createCommand($sql)
            ->bindValue(':mindmap_id', $this->id)
            ->execute();
        } catch(Exception $e)
        {
            echo $e->getMessage();
        }

        return parent::beforeDelete();
    }

    public function afterSave()
    {
        /* insert default nodes */
        if($this->isNewRecord){
            Node::model()->insertDefaultNodes($this->id);
        }
        return parent::afterSave();
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('user_id, name', 'required'),
            array('user_id', 'length', 'max' => 20),
            array('name', 'length', 'max' => 255),
            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id, user_id, name', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations()
    {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
            'nodes' => array(self::HAS_MANY, 'Node', 'mindmap_id'),
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels()
    {
        return array(
            'id' => 'Id',
            'user_id' => 'User',
            'name' => 'Name',
        );
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */
    public function search()
    {
        // Warning: Please modify the following code to remove attributes that
        // should not be searched.

        $criteria = new CDbCriteria;

        $criteria->compare('id', $this->id, true);

        $criteria->compare('user_id', $this->user_id, true);

        $criteria->compare('name', $this->name, true);

        return new CActiveDataProvider('Mindmap', array(
            'criteria' => $criteria,
        ));
    }
}