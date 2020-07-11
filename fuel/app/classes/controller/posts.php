<?php

class Controller_Posts extends Controller_Template
{

	public function action_action()
	{
		$data["subnav"] = array('action'=> 'active' );
		$this->template->title = 'Posts &raquo; Action';
		$this->template->content = View::forge('posts/action', $data);
	}

}
