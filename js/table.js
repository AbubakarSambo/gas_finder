$(document)
		.ready(
			function() {	
				height = $(document).height();
				width = $(document).width();
				
				table_head_height = $('#table_head').height();
				$('#box').css('width',width);
				// alert(table_head_height);
				$('#box').css('bottom',table_head_height);
				// alert($('#box').width());
				
				
				$('#openpanel').click(function(){
					$('#box').animate({'bottom':'-10%'},300);
				});

				$('#close').click(function(){
					$('#box').animate({'bottom':'-75%'},300)        
				});

			});
