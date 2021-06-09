function checkMK(a) {
			var validate = /^KH[0-9]{5}$/;
			return validate.test(a);
		}
		function checksdt(a) {
			var validate = /^((090)|(091)|(8490)|(8491))[0-9]{7}$/;
			return validate.test(a);
		}
		function checkemail(a) {
			var validate = /[a-zA-Z0-9]+@fsoft\.com\.vn$/;
			return validate.test(a);
		}
		function checkmakhachhang(makh) {
			if (checkMK(makh)) {
				$('#makherr').text("");
				$("#makh").css("border-color", "green");
				return true;
			} else {
				$("#makh").css("border-color", "red");
				$('#makherr').text(
						"Mã khách hàng không đúng định dạng(KHxxxxx)");
				return false;
			}
		}
		function checksdtkhachhang(sdt) {
			if (checksdt(sdt)) {
				$('#sdterr').text("");
				$("#sdt").css("border-color", "green");
				return true;
			} else {
				$("#sdt").css("border-color", "red");
				$('#sdterr')
						.text("SDT không đúng định dạng 090xxxxxxx|091xxxxxxx|(84)+90xxxxxxx | (84)+91xxxxxxx");
				return false;
			}
		}
		function checkemailkhachhang(email) {
			if (checkemail(email)) {
				$('#emailerr').text("");
				$("#email").css("border-color", "green");
				return true;
			} else {
				$("#email").css("border-color", "red");
				$('#emailerr').text("Email không đúng định dang FPT");
				return false;
			}
		}
		function chechkhongtrong(makh, sdt, email, tenkh, diachi) {
			if (makh == "") {
				$('#makherr').text("Mã khách hàng không được bỏ trống !!");
			}
			if (tenkh == "") {
				$("#tenkhach").css("border-color", "red");
				$('#tenkherr').text("Tên khách hàng không được bỏ trống !!");
			}
			if (email == "") {
				$('#emailerr').text("Email không được bỏ trống !!");
			}
			if (diachi == "") {
				$("#diachi").css("border-color", "red");
				$('#diachierr').text("Địa chỉ không được bỏ trống !!");
			}
			if (sdt == "") {
				$('#sdterr').text("SDT không được bỏ trống !!!");
			}
			if (makh != "" && tenkh != "" && sdt != "" && diachi != ""
					&& email != "") {
				return true;
			} else {
				return false;
			}
		}

		$('#supmitkh').click(function() {
			var makh = $('#makh').val();
			var tenkhach = $('#tenkhach').val();
			var email = $('#email').val();
			var diachi = $('#diachi').val();
			var sdt = $('#sdt').val();
			var a = chechkhongtrong(makh, sdt, email, tenkhach, diachi);
			var b = checkmakhachhang(makh);
			var c = checksdtkhachhang(sdt);
			var d = checkemailkhachhang(email);
			if (a && b && c && d) {
				$('#formkh').submit();
			}
		});