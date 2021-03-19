<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	public function encloseWithQuotes($input = "", $enclose = '')
	{
		$input = str_replace('"', '""', $input);
		$input = preg_replace('/\s+/', ' ', trim($input));
		return $enclose . mb_convert_encoding($input, 'sjis-win', 'AUTO') . $enclose;
	}
}
