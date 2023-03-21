$(document).ready(function () {
    // Load employees from XML file
    $.ajax({
        type: "GET",
        url: "employee2.xml",
        dataType: "xml",
        success: function (xml) {
            // Parse XML and display employees
            $('#employee-list').empty(); // Clear existing employees

            // Parse XML and display employees
            $(xml).find("department").each(function (i, departmentElem) {
                var departmentName = $(departmentElem).attr("name");
                var $departmentSection = $('<section class="empSection container blockqoute border border-warning border-4"><h2 class="my-h2">' + departmentName + '</h2><div class="row"></div></section>');

                $(departmentElem).find("subdepartment").each(function (j, subdepartmentElem) {
                    var subdepartmentName = $(subdepartmentElem).attr("name");
                    var $subdepartmentSection = $('<section class="empSection blockquote-footer border border-warning border-4><h3 class="my-h3">' + subdepartmentName + '</h3><div class="row"></div></section>');

                    $(subdepartmentElem).find('employee').each(function (k, employeeElem) {
                        var name = $(employeeElem).attr("name");
                        var image = $(employeeElem).attr("image");
                        var title = $(employeeElem).attr("title");
                        var email = $(employeeElem).attr("email");
                        var category = $(employeeElem).attr("category");

                        var $employeeDiv = $('<div class=" my-employee ' + category + ' ' + departmentName + '">' +
                            '<img class=" mt-5 align-center border border-dark border-4 img-thumbnail testimonial-logo rounded-3 shadow" height="200" width="200" background-size="cover" src="' + image + '" alt="' + name + '">' +
                            '<h4 class="border border-secondary border-2 fw-bold text-center text-capitalize">' + name + '</h4>' +
                            '<p class="border border-secondary border-2 fw-bold text-center">' + title + '</p>' +
                            '<a class="border border-secondary border-2 email fw-bold text-center mb-5" href="mailto:' + email + '">' + email + '</a>' +
                            '</div>');

                        $subdepartmentSection.find('.row').append($employeeDiv);
                    });
                    $departmentSection.append($subdepartmentSection);
                });
                $('#employee-list').append($departmentSection);
            });
        },
        error: function () {
            alert('Error loading employees.');
        },
    });

    // Filter employees by category
    $("#category").on('change', function () {
        var category = $(this).val();
        if (category === 'All') {
            $('.my-employee').show();
            $('h2.my-h2, h3.my-h3').show();
        } else {
            $('.my-employee').hide();
            $('.' + category).show();
            $('h2.my-h2').each(function (l, h2Elem) {
                var $this = $(h2Elem);
                var $subsections = $this.nextUntil('h2.my-h2');
                if ($subsections.find('.' + category).length > 0) {
                    $this.show();
                    $subsections.show();
                } else {
                    $this.hide();
                    $subsections.hide();
                }
            });
        }
    });
});










/*
//original xml
<?xml version="1.0" encoding="UTF-8"?>
<employees>
	<department name="Sell">
		<subdepartment name="Sellers">
			<employee name="Rick Sanchez" image="./Assets/image/business-man-black-tuxedo-white-background.jpg" title="Founder, Head of Design" email="rick.c347@skeletons.com" />
			<employee name="Han Solo" image="./Assets/image/businessman-his-office-holding-cactus.jpg" title="Head of Logistics" email="solo.falcon@skeletons.com" />
		</subdepartment>
	</department>
	<department name="Buy">
		<subdepartment name="Buyers">
			<employee name="Tim Berners Lee" image="./Assets/image/young-man-beige-jacket-cap-holding-eyeglasses-with-both-hands-looking-optimistic-front-view.jpg" title="Website Architect" email="tim0@skeletons.com" />
			<employee name="SkeleAI" image="./Assets/image/businessman-his-office-playing-with-balloon.jpg" title="GAI, real CEO" email="zero@skeletons.com" />
		</subdepartment>
	</department>
	<department name="Dev">
		<subdepartment name="Developers">
			<employee name="David Chen" image="./Assets/image/businessman-his-office-holding-cactus.jpg" title="Senior Software Engineer" email="david.chen@skeletons.com" />
			<employee name="Amy Li" image="./Assets/image/businessman-his-office-making-good-bad-sign.jpg" title="Software Engineer" email="amy.li@skeletons.com" />
		</subdepartment>
	</department>
	<department name="Others">
		<subdepartment name="PR">
			<employee name="Tom Nguyen" image="./Assets/image/businessman-his-office-playing-with-balloon.jpg" title="QA Manager" email="tom.nguyen@skeletons.com" />
			<employee name="Emily Wang" image="./Assets/image/smiling-worker-playing-with-his-tie.jpg" title="QA Analyst" email="emily.wang@skeletons.com" />
		</subdepartment>
	</department>
</employees>

            */