Given /^I start the app the first time$/ do
    #Touch on next of the first screen
    touch("android.support.v7.widget.AppCompatImageButton id:'next'")
    #Touch on next of the second screen
    touch("android.support.v7.widget.AppCompatImageButton id:'next'")    
    touch("android.support.v7.widget.AppCompatImageButton id:'done'")
end

Then /^I enter "([^\"]*)" into input "([^\"]*)"$/ do |text, id|
    enter_text("android.support.v7.widget.AppCompatEditText id:'#{id}'", "#{text}")    
end

Then /^I enter "([^\"]*)" into input unit$/ do |text|
    enter_text("org.isoron.uhabits.activities.habits.edit.views.ExampleEditText id:'tvUnit'", "#{text}")    
end

And /^I wait (\d+) seconds$/ do |value|
    sleep value
end

And /^I wait 1 second$/ do
    sleep 1
end
