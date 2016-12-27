<?php
include_once "config.php";
class Dbconn {
	/**
	 * The database object
	 *
	 * @var object
	 */
	private $_db;
	
	/**
	 * Checks a database object and creates one if none is found
	 *
	 * @param object $db        	
	 * @return void
	 */
	public function __construct($db = NULL) {
		if (is_object ( $db )) {
			$this->_db = $db;
		} else {
			$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
			$this->_db = new PDO ( $dsn, DB_USER, DB_PASS );
		}
	}
	
	public function get_details($name) {
		$sql = "SELECT * FROM stations WHERE name = :name";
		if ($stmt = $this->_db->prepare ( $sql )) {
			$stmt->bindParam ( ":name", $name );
			$stmt->execute ();
			$results = $stmt->fetchAll ( PDO::FETCH_ASSOC );
			$json = json_encode ( $results );
				
			return $json;
				
			
		}
	
	}
	
	public function searchimage($name) {		
		$sql = "SELECT image FROM stations WHERE name LIKE :name";
		if ($stmt = $this->_db->prepare ( $sql )) {
			$stmt->bindValue(':name', '%' . $name . '%');
			$stmt->execute ();
			$results = $stmt->fetch ( PDO::FETCH_ASSOC );
			
			$imageurl = $results['image'];
			
			echo $imageurl;
		}
	}
	
}

?>