# -*- coding: utf-8 -*-

db.define_table('organization',
  Field('name'),
  auth.signature)