import requests
import json
import urllib
from urllib.parse import urlencode

class HSClient():
    api_key = 'demo'
    max_results = 500
    count = 5

    def __init__(self, api_key, mr, count):
        self.api_key = api_key
        self.max_results = mr
        self.count = count


    def get_contacts(self):
        contact_list = []
        property_list = []
        get_all_contacts_url = "https://api.hubapi.com/contacts/v1/lists/all/contacts/all?"
        parameter_dict = {
            'hapikey': self.api_key, 'count': self.count}
        headers = {}

        # Paginate your request using offset
        has_more = True
        while has_more:
            parameters = urlencode(parameter_dict)
            get_url = get_all_contacts_url + parameters
            r = requests.get(url=get_url, headers=headers)
            response_dict = json.loads(r.text)
            has_more = response_dict['has-more']
            contact_list.extend(response_dict['contacts'])
            parameter_dict['vidOffset'] = response_dict['vid-offset']
            # Exit pagination, based on whatever value you've set your max results variable to.
            if len(contact_list) >= self.max_results:
                print('maximum number of results exceeded')
                break
        print('loop finished')

        list_length = len(contact_list)

        print(contact_list)

        print("You've succesfully parsed through {} contact records and added them to a list".format(list_length))

        return contact_list


    def get_deals(self):
        deal_list = []
        get_all_deals_url = "https://api.hubapi.com/deals/v1/deal/paged?"
        parameter_dict = {'hapikey': self.api_key, 'limit': self.count}
        headers = {}

        # Paginate your request using offset
        has_more = True
        while has_more:
            parameters = urllib.parse.urlencode(parameter_dict)
            get_url = get_all_deals_url + parameters
            r = requests.get(url= get_url, headers = headers)
            response_dict = json.loads(r.text)
            has_more = response_dict['hasMore']
            deal_list.extend(response_dict['deals'])
            parameter_dict['offset']= response_dict['offset']
            if len(deal_list) >= self.max_results: # Exit pagination, based on whatever value you've set your max results variable to.
                print('maximum number of results exceeded')
                break
        
        print('loop finished')
        print(deal_list)

        list_length = len(deal_list) 

        print("You've succesfully parsed through {} deal records and added them to a list".format(list_length))

        return deal_list
