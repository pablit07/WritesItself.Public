
var ContactController = function() {
	this.init();
};

ContactController.prototype.init = function() {
	this.module = new ContactModule($("#ContactModule"));
	this.attachEvents();
	this.module.setDefaultValues();
};

ContactController.prototype.attachEvents = function() {

	var self = this;

	this.module.add.on('click', function() {
		var data = self.module.getFormData();

		$.ajax({
			url: "util/formMailer.php",
			type: "post",
			data: data,
			success: function() {
				alert("Your info was submitted. Thanks!");
			},
			error: function() {
				alert("There was some trouble submitting your info. Please try again or let us know you are experiencing problems.");
			},
			complete: function() {
				setTimeout(function() { self.module.close(); }, 1000);
			}
		});
	});

	this.module.fields.email.on('focus', function() {
		self.module.open();
	});

	this.module.cancel.on('click', function() {
		self.module.resetForm();
		self.module.close();
	});

	this.module.$el.on('focus', 'input[type=text]', function() {

		var $this = $(this);

		if ($this.val() === $this.attr('defaultvalue'))	{
			//clear default text on focus
			$this.val("");
		}
	});

};

var ContactModule = function(el) {
	if (!el.jQuery) { el = $(el); }

	this.$el = el;
	this.el = el[0];

	this.$drawer = $(".drawer", this.el);

	this.fields = {
		email: $("input[name=email]", this.el),
		phone: $("input[name=phone]", this.el),
		preference: $("input[name=preference]", this.el)
	};

	this.add = $(".email button[name=add]");
	this.cancel = $("button[name=cancel]", this.el);
};

ContactModule.prototype.open = function() {
	var self = this;

	this.$drawer.animate({bottom: -36}, 500, function() {
		self.isOpen = true;
	});
};

ContactModule.prototype.close = function() {
	var self = this;

	this.$drawer.animate({bottom: -161}, 200, function() {
		self.isOpen = false;
		self.resetForm();
	});
};

ContactModule.prototype.getPrefValue = function() {
	return this.fields.preference.filter(":checked").val()
		|| "Not Selected";
}

ContactModule.prototype.getFormData = function() {
	var data = {
		email: this.fields.email.val(),
		phone: this.fields.phone.val(),
		preference: this.getPrefValue()
	};

	return data;
};
ContactModule.prototype.setDefaultValues = function() {
	this.fields.email.val(this.fields.email.attr("defaultvalue"));
	this.fields.phone.val(this.fields.phone.attr("defaultvalue"));
};
ContactModule.prototype.resetForm = function() {
	this.setDefaultValues();

	this.fields.preference.each(function() {
		$(this).attr("checked", null);
	});
};