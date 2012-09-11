<?php

/**
 * This is the model class for table "node".
 *
 * The followings are the available columns in table 'node':
 * @property string $id
 * @property string $type
 * @property string $mindmap_id
 * @property string $title
 * @property string $description
 * @property string $value
 * @property string $units
 * @property string $parent_id
 * @property string $xpos
 * @property string $ypos
 */
class Node extends CActiveRecord
{
    private $_defaultNodes = array(
        array('type'=>1,'title'=>'Root', 'description'=>'Root node', 'value'=>0,'units'=>0),
        array('type'=>2,'title'=>'Expense', 'description'=>'Expense node', 'value'=>0,'units'=>0),
        array('type'=>2,'title'=>'Values', 'description'=>'Values node', 'value'=>0,'units'=>0),
        array('type'=>2,'title'=>'Revenue', 'description'=>'Revenue node', 'value'=>0,'units'=>0)
    );
	/**
	 * Returns the static model of the specified AR class.
	 * @return Node the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'node';
	}

    public function beforeDelete()
    {
        Yii::app()->db->createCommand('DELETE FROM node WHERE parent_id=:parent_id')
            ->bindValue(':parent_id', $this->id)
            ->execute();

        return parent::beforeDelete();
    }

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('type, mindmap_id, title', 'required'),
			array('type', 'length', 'max'=>10),
			array('mindmap_id', 'length', 'max'=>20),
			array('title', 'length', 'max'=>255),
			array('description', 'length', 'max'=>500),
			array('value, units', 'length', 'max'=>1000),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, type, mindmap_id, title, description, value, units', 'safe', 'on'=>'search'),
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
			'mindmap' => array(self::BELONGS_TO, 'Mindmap', 'mindmap_id'),
			'type0' => array(self::BELONGS_TO, 'NodeType', 'type'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'Id',
			'type' => 'Type',
			'mindmap_id' => 'Mindmap',
			'title' => 'Title',
			'description' => 'Description',
			'value' => 'Value',
			'units' => 'Units',
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

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);

		$criteria->compare('type',$this->type,true);

		$criteria->compare('mindmap_id',$this->mindmap_id,true);

		$criteria->compare('title',$this->title,true);

		$criteria->compare('description',$this->description,true);

		$criteria->compare('value',$this->value,true);

		$criteria->compare('units',$this->units,true);

		return new CActiveDataProvider('Node', array(
			'criteria'=>$criteria,
		));
	}

    public function insertDefaultNodes($mindmapId)
    {
        $parent = false;
        foreach($this->_defaultNodes as $dnode)
        {
            $node = new Node();
            $node->setAttributes($dnode);
            $node->mindmap_id = $mindmapId;
            if($parent)
            {
                $node->parent_id = $parent;
            }
            if(!$node->save())
            {
                return false;
            }
            if($dnode['type']==1)
            {
                $parent = $node->id;
            }
        }
        return true;
    }
}