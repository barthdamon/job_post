		


var ref= new Firebase("https://anthillsignup.firebaseio.com/jobPost");

var company_name='';
var company_email='';
var company_location='';
var company_industry='';
var job_category='';
var categoryOther='';
var job_description='';
var job_timeframe='';
var job_title='';
var pay_yn='Paid';
var pay_type='';
var pay_amount='';
var start_date='';
var end_date='';
var start_date_other='';
var end_date_other='';

var payReqs=false;
var catPlace='';
var timePlace='';
var radioChecking=["#writing","#finance","#entertainment", "#salesmarketing","#socialmedia", "#eventproduction", "#fineart", "#mobileapp", '#photography', '#videography', '#website', '#graphicdesign', '#research', '#programming', '#other', "#gig", "#days", "#weeks","#months", "#ongoing", "#payYn", "#startASAP", "#startother", "#endNone", "#endFlex", "#endother"];
var inputBoxes=['#categoryOther, #endDateOther','#startDateOther','#payAmount',"#jobDesc","#jobTitle"];

$(document).ready(function() {
	//For initial if they don't change them
	pay_type=$('#payType').val();

	$('#compName').change(function() {
		company_name=$(this).val();
	});
	$('#industry').change(function() {
		company_industry=$(this).val();
	});
	$('#email').change(function() {
		company_email=$(this).val();
	});
	$('#location').change(function() {
		company_location=$(this).val();
	});



// This is the job category selection
	$('#writing').click(function() {
		job_category='Writing';
	});
	$('#finance').click(function() {
		job_category='Finance';
	});
	$('#entertainment').click(function() {
		job_category='Entertainment';
	});
	$('#salesmarketing').click(function() {
		job_category='Sales & Marketing';
	});
	$('#socialmedia').click(function() {
		job_category='Social Media';
	});
	$('#eventproduction').click(function() {
		job_category='Event Production';
	});	
	$('#fineart').click(function() {
		job_category='Fine Art';
	});	
	$('#mobileapp').click(function() {
		job_category='Mobile Apps';
	});	
	$('#photography').click(function() {
		job_category='Photography';
	});	
	$('#videography').click(function() {
		job_category='Videography';
	});
	$('#website').click(function() {
		job_category='Building Websites';
	});		
	$('#graphicdesign').click(function() {
		job_category='Graphic Design';
	});		
	$('#categoryOther').change(function() {
		job_category=$(this).val();
	});	



//this is the timeframe selection
	$('#gig').click(function() {
		job_timeframe='Gig';
	});
	$('#days').click(function() {
		job_timeframe='Days';
	});
	$('#weeks').click(function() {
		job_timeframe='Weeks';
	});
	$('#months').click(function() {
		job_timeframe='Months';
	});
	$('#ongoing').click(function() {
		job_timeframe='Ongoing';
	});

	$('#jobTitle').change(function() {
		job_title=$(this).val();
	});

	$('#jobDesc').change(function() {
		job_description=$(this).val();
	});

	$('#payYn').click(function() {
		if (!payReqs){
			payReqs=true;
			pay_yn="Unpaid";
		}
		else{
			pay_yn="Paid";
			checkPayReqs();
		}
	});

	$('#payType').change(function() {
		pay_type=$(this).val();
		checkPayReqs();
	});

	$('#payAmount').change(function() {
		pay_amount=$(this).val();
		checkPayReqs();
	});

//Start Date
	$('#startasap-reveal').click(function() {
		start_date='Start ASAP';
	});
	$('#startflex-reveal').change(function() {
		start_date='Flexible Start Date';
	});
	$('#startDateOther').change(function() {
		start_date=$(this).val();
	});

//End Date
	$('#endnone-reveal').click(function() {
		end_date='No Deadline';
	});
	$('#endflexible-reveal').click(function() {
		end_date='Flexible Deadline';
	});	
	$('#endDateOther').change(function() {
		end_date=$(this).val();
	});

$('#jobPost').submit(function(event) { 
	var errors = '';
	var date = Date();

	if (company_name != '' && company_email != '' && company_location != '' && company_industry != '' &&  job_category!= '' &&  job_description!= '' &&  job_timeframe!= '' &&  job_title!= '' &&  payReqs && start_date!= '' && end_date!= '') {

		ref.push({
			companyName: company_name,
			companyEmail: company_email,
			companyLocation: company_location,
			companyIndustry: company_industry,
			jobCategory: job_category,
			jobDescription: job_description,
			jobTimeframe: job_timeframe,
			jobTitle: job_title,
			paidYN: pay_yn,
			payType: pay_type,
			payAmount: pay_amount,
			startDate: start_date,
			endDate: end_date,
			dateCreated: date	
	  	});
	  	$(window).on('beforeunload', function(){
    		ref.close();
		});
		
	    event.preventDefault();
        
	    $.ajax({
	        success: function() {
	        	$('#jobPost').hide();
				$('#mainImage').hide();
				$('.container').hide();
				$('.sub-title').hide();
				$('.success').css("display","block");
				//Here is where you can add css for the post another job page
				$('.success').html('<h1>Thanks for posting a job on Ant Hill!</h1><h3>It is business owners like you that keep the economy healthy.  If you have any questions at all, send us a <a href="mailto:marcella@anthilljobs.com">message.</a></h3><br><input style="float: center;" type="submit" value="POST ANOTHER" class="btn btn-submit-post" onclick="rePost();">').fadeIn();
	        }
	    });
    }
        
    if (company_name == '') {
        errors += " enter a company name,";   
    }
    if (company_email == '') {
        errors += " enter an email,";   
    }
    if (company_location == '') {
        errors += " enter a location,";   
    }
    if (company_industry == '') {
        errors += " enter an industry,";   
    }  
    if (job_category == '') {
        errors += " enter a job category,";   
    }    
    if (job_description == '') {
        errors += " enter a job description,";   
    }   
    if (job_timeframe == '') {
        errors += " enter a job timeframe,";   
    }   
    if (job_title == '') {
        errors += " enter a job title,";   
    }   
    if (!payReqs) {
        errors += " enter payment details,";   
    }   
    if (start_date == '') {
        errors += " enter a start date,";   
    }   
    if (end_date == '') {
        errors += " enter an end date,";   
    }
    if (errors != '') {
        handleError(errors);   
    }
    return false;
	});
});


function rePost(){
	//showing job parts of the page again, not the sub title the second time (although we could)
	$('#mainImage').show();
	$('.success').css("display","none");

	//This is sort of for fun, but I thought we could do something like this:
	$('.sub-title').css("text-align","center");
	var funMessage=Math.floor((Math.random() * 5) + 1);
	if (funMessage==1)
	$('.sub-title').html('Give it another go, boss.');
	
	if (funMessage==2)
	$('.sub-title').html('The economy and your workload are smiling right now.');

	if (funMessage==3)
	$('.sub-title').html('It is business owners like you that make the world go round.');

	if (funMessage==4)
	$('.sub-title').html('Find another hardworking Anthiller!');

	if (funMessage==5)
	$('.sub-title').html('Post again, and watch the applications come flying in.');


//END of the fun stuff

	//Clearing Active Radioboxes
	for (var i=0; i<radioChecking.length; i++) {
		$(radioChecking[i]).prop('checked', false);
	}

	//Clearing the input fields
	for (var j=0; j<inputBoxes.length; j++) {
		$(inputBoxes[j]).val('');
	}
	$("#start-reveal-if-active").hide();
	$("#end-reveal-if-active").hide();
	$('#payType').val("For the Project");
	payReqs=false;
	job_category='';
	categoryOther='';
	job_description='';
	job_timeframe='';
	job_title='';
	pay_yn='';
	pay_type='';
	pay_amount='';
	start_date='';
	end_date='';
	start_date_other='';
	end_date_other='';
	pay_yn='Paid';

	$('.error').html('');
	$('.container').slideDown();
}

function checkPayReqs () {
	if (!($('#payYn').attr('checked')) && ($('#payType').val()=="")||($('#payAmount').val()=="")){
		payReqs=false;
	}
	else{
		payReqs=true;
	}
}

function handleError(errors) {
         $('.error').html('<p>' + '*Please fix the following problems: ' + errors + '</p').fadeIn();   
}