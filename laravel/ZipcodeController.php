<?php

namespace App\Http\Controllers;

use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class ZipcodeController extends Controller
{
    use ResponseTrait;

	public function search(Request $request)
	{
		$curl = curl_init();
		$url = "https://zipcloud.ibsnet.co.jp/api/search"."?zipcode={$request->zipcode}&limit=1";
		curl_setopt($curl, CURLOPT_POST, 0);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_URL, $url);

		$response = curl_exec($curl);
		curl_close($curl);

		return $this->responseSuccess(__('get_api_successfully'), json_decode($response));
    }
}
