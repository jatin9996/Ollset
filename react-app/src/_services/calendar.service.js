import { AClient } from './apollo/apollo-client-config';
import {
    gql
  } from "@apollo/client";
import { CustomGraphQLAdaptor } from './custom-graphql-adapter.service';
import moment from 'moment';
import { isNullOrUndefined } from '@syncfusion/ej2-base';


export class CalendarService {
  

	addCalendarQuery() {
		return gql`mutation(calendarName: String!,
							calendarId: String!,
							defaultCalendar: String!,
							calendarDescription: String!,
							timezone: String!,
							colorCode: String! ) {
			createAddCalendar(addNewCalendarRequestModel: {
				name: calendarName,
				calendarId: calendarId,
				defaultCalendar: defaultCalendar,
				description: calendarDescription,
				timezoneId: timezone,
				color: colorCode
			}){
				isSuccess
				reason
			}
		}`;
	}

	addCalendar(calendarName, calendarId, defaultCalendar, calendarDescription, timezone, colorCode) {
		let params = {
			name: calendarName,
			calendarId: calendarId,
			defaultCalendar: defaultCalendar,
			description: calendarDescription,
			timezoneId: timezone,
			color: colorCode
		};
		return AClient.mutate({
			mutation: this.addCalendarQuery(),
			variables : params,
			notifyOnNetworkStatusChange: true
		});
	}

	deleteCalendarQuery() {
		return gql`mutation($calendarId: Long!) {
			createDeleteCalendar(deleteCalendarRequestModel: {
				calendarId: $calendarId
			}){
				isSuccess
				reason
			}
		}`;
	}

	deleteCalendar(calendarId) {
		let params = {
			calendarId: calendarId,
		};
		return AClient.mutate({
			mutation: this.deleteCalendarQuery(),
			variables : params,
			notifyOnNetworkStatusChange: true
		});
	}

	deleteEventQuery(bookingId) {
		return gql`mutation($bookingId: Long!){
					createDeleteEvent(deleteEventRequestModel: {
						calendarBookingId: $bookingId
					}){
						isSuccess
						reason
					}
				}`;
	}

	deleteEvent(bookingId) {
		let params = {
			bookingId: bookingId,
		};
		return AClient.mutate({
			mutation: this.deleteEventQuery(),
			variables : params,
			notifyOnNetworkStatusChange: true
		});
	}

	addUpdateEventQuery(parameters, calendarId) {
		let params = {
			calendarBookingId: parameters.hasOwnProperty('Id') ? parameters.Id : 0,
			calendarId: calendarId,
			allDay: parameters.hasOwnProperty('IsAllDay') && !isNullOrUndefined(parameters.IsAllDay) ? parameters.IsAllDay : false,
			description: parameters.hasOwnProperty('Description') ? parameters.Description : '',
			location: parameters.hasOwnProperty('Location') ? parameters.Location : '',
			startTime: moment(parameters.StartTime).format('MM-DD-YYYY h.mm A'),
			endTime: moment(parameters.EndTime).format('MM-DD-YYYY h.mm A'),
			reminderType: 'email',
			title: parameters.hasOwnProperty('Subject') ? parameters.Subject : '',
			repeat: false,
			eventType: parameters.EventType,
			categoryIds: "",
			tags: ""
			
		};
		return AClient.mutate({
			mutation: gql`mutation($calendarBookingId: Long!,
						$calendarId: Long!,    
						$allDay: Boolean!,
						$description: String!,
						$location: String!,
						$startTime: String!,
						$endTime: String!,
						$reminderType: String!,
						$title: String!,
						$repeat: Boolean!,
						$eventType: Int!,
						$categoryIds: String!,
						$tags: String!) {
					createAddEvent(addEventRequestModel: {
						calendarBookingId: $calendarBookingId,
						calendarId: $calendarId   
						allDay: $allDay
						description: $description
						location: $location
						startTime: $startTime
						endTime: $endTime
						reminderType: $reminderType
						title: $title
						repeat: $repeat
						eventType: $eventType
						categoryIds: $categoryIds
						tags: $tags
					
					}){
						isSuccess
						reason
						calendarBookingModel {
							Id
							calendarId
							title
							description
							startTime
							endTime
						}
					}
			}`,
			variables: params
		});
	}

	adapterEvents(calendarId) {
		
		return new CustomGraphQLAdaptor({ 
				query: `query myEvents($calendarId: String!) {
						eventCalendar(calendarId: $calendarId) {
							items {
								Id
								IsAllDay
								color
								titile
								description
								startTime
								endTime
								timezone
								location
								}
							totalCount
						}
					}`,
				variables: {
						'calendarId' : calendarId
					}
			})
		
		
	}
	getMyEvents(calendarID) {
		let params = {
			"calendarId": calendarID
		};
		return AClient.query({
			query: gql`
				query($calendarId: String!){
					events(calendarBookingRequestModel: {
					calendarIds: $calendarId 
					}){
						items {
						Id
						IsAllDay
						calendarId
						color
						title
						description
						startTime
						endTime
						timezone
						location
						eventType
						invitedUsers {
							fullName
							portraitURL
							userId
							username
						}
						isRecurring
						recurrence {
							frequency
							interval
							expirationDate
						}
						}
						page
						pageSize
						totalCount
					}
					}
			`,
			variables : params
		});
	}

	
}